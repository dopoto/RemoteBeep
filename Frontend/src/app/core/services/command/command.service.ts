import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, IHttpConnectionOptions } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { environment } from 'src/environments/environment';
import { LogService } from '../log/log.service';
import {
    initStart,
    initOk,
    initError,
} from 'src/app/state/actions/app-config.actions';
import {
    requestPlay,
    requestStop,
} from 'src/app/state/actions/play-sounds.actions';
import { selectGroup } from 'src/app/state/selectors/send-receive.selectors';
import {
    addClientToGroup,
    removeClientFromGroup,
    updateConnectionId,
    updateListOfClientsConnectedToGroup,
} from 'src/app/state/actions/send-receive.actions';

@Injectable({
    providedIn: 'root',
})
export class CommandService {
    private readonly baseUrl: string = `${environment.serverUrl}/hub`;
    public hubConnection!: HubConnection;
    ngDestroyed$ = new Subject();

    public group = '';

    constructor(
        private logService: LogService,
        private readonly store: Store,
        private http: HttpClient
    ) {}

    init() {
        this.store
            .select(selectGroup)
            .pipe(takeUntil(this.ngDestroyed$), distinctUntilChanged())
            .subscribe((group) => {
                this.group = group;
                this.store.dispatch(initStart());
                this.hubConnection = this.buildConnection();
                this.startConnection(group);
                this.addHandlers(group);
            });
    }

    buildConnection(): HubConnection {
        return (window as any).signalrMock || new signalR.HubConnectionBuilder()
            .withUrl(this.baseUrl, <IHttpConnectionOptions>{
                withCredentials: false,
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    dispatchInitialClientsInGroupCount(groupName: string) {
        this.http
            .get<string[]>(
                `${environment.serverUrl}/devices-in-group?groupName=${groupName}`
            )
            .pipe(takeUntil(this.ngDestroyed$), distinctUntilChanged())
            .subscribe((connectionIds) => {
                const data = { connectionIds };
                this.store.dispatch(
                    updateListOfClientsConnectedToGroup(data)
                );
            });
    }

    sendPlayCommandToRemoteClients(command: BeepCommand): void {
        this.hubConnection
            .send(
                'play',
                command.freqInKhz.toString(),
                command.durationInSeconds.toString(),
                this.group
            )
            .then(() => {
                this.logService.info('play msg sent');
            });
    }

    sendStopCommandToRemoteClients(): void {
        this.hubConnection
            .send(
                'stop',
                this.group
            )
            .then(() => {
                this.logService.info('stop msg sent');
            });
    }

    leaveGroup(): Promise<any> {
        return this.hubConnection.send('removeFromGroup', this.group);
    }

    addHandlers(group: string) {
        this.hubConnection.onclose(() => {
            this.hubConnection.send('removeFromGroup', group).then(() => {
                this.logService.info('removed from group ' + group);
            });
            this.logService.info('Disconnected');
        });

        this.hubConnection.on('addedToGroup', (addedConnectionId: string, connectionIds: string[]) => {
            const data = { addedConnectionId, connectionIds };
            this.store.dispatch(addClientToGroup(data));
        });

        this.hubConnection.on(
            'removedFromGroup',
            (removedConnectionId: string, connectionIds: string[]) => {
                const data = { removedConnectionId, connectionIds };
                this.store.dispatch(removeClientFromGroup(data));
            }
        );

        this.hubConnection.on(
            'playCommandReceived',
            (freqInKhz: string, durationInSeconds: string) => {
                this.logService.info(
                    `Got play command : ${freqInKhz}|${durationInSeconds}`
                );
                const beepCommand = {
                    freqInKhz: +freqInKhz,
                    durationInSeconds: +durationInSeconds,
                } as BeepCommand;
                this.store.dispatch(requestPlay({ beepCommand: beepCommand }));
            }
        );

        this.hubConnection.on('stopCommandReceived', () => {
            this.logService.info(`Got stop command`);
            this.store.dispatch(requestStop());
        });
    }

    startConnection(group: string): void {
        this.hubConnection
            .start()
            .then(() => {
                setTimeout(() => {
                    const connData = {
                        connectionId: this.hubConnection.connectionId ?? '',
                    };
                    this.store.dispatch(updateConnectionId(connData));

                    this.hubConnection
                        .send('addToGroup', group)
                        .then(() => {
                            this.logService.info(
                                'addToGroup / dispatchInitialClientsInGroupCount'
                            );
                            this.dispatchInitialClientsInGroupCount(group);
                        });

                    this.store.dispatch(initOk());

                    this.logService.info('Connection started');
                }, 500);
            })
            .catch((err) => {
                this.logService.info('Error while starting connection: ' + err);
                const errorMessage =
                    'Error while initializing the application. Please refresh the page or try again later.';
                this.store.dispatch(initError({ errorMessage }));
            });
    }

    // TODO Revisit
    ngOnDestroy() {
        this.logService.info('destroying');
        this.ngDestroyed$.next(null);
        // this.logService.info('destroying');
        // this.hubConnection.stop().then(() => {
        //     this.logService.info('destroyed');
        // });
    }
}
