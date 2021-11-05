import { Injectable } from '@angular/core';
import { HubConnection, IHttpConnectionOptions } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { BeepCommand } from 'src/app/core/models/beep-command';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LogService } from '../log/log.service';
import {
    initStart,
    initOk,
    initError,
} from 'src/app/state/actions/app-config.actions';
import { beginPlayStart } from 'src/app/state/actions/play-sounds.actions';
import { selectChannel } from 'src/app/state/selectors/send-receive.selectors';
import {
    addClientToChannel,
    removeClientFromChannel,
    updateConnectionId,
    updateListOfClientsConnectedToChannel,
} from 'src/app/state/actions/send-receive.actions';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CommandService {
    private readonly baseUrl: string = `${environment.serverUrl}/hub`;
    public hubConnection!: HubConnection;
    ngDestroyed$ = new Subject();

    public channel = '';

    constructor(
        private logService: LogService,
        private readonly store: Store,
        private http: HttpClient
    ) {}

    init() {
        this.store
            .select(selectChannel)
            .pipe(takeUntil(this.ngDestroyed$), distinctUntilChanged())
            .subscribe((channel) => {
                this.channel = channel;
                this.logService.info('DISPAATCXHING IINIITSTART');
                this.store.dispatch(initStart());
                this.hubConnection = this.buildConnection();
                this.startConnection(channel);
                this.addHandlers(channel);
            });
    }

    buildConnection(): HubConnection {
        return new signalR.HubConnectionBuilder()
            .withUrl(this.baseUrl, <IHttpConnectionOptions>{
                withCredentials: false,
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    dispatchInitialClientsInChannelCount(channelName: string) {
        this.http
            .get<string[]>(
                `${environment.serverUrl}/devices-in-channel?channelName=${channelName}`
            )
            .pipe(takeUntil(this.ngDestroyed$), distinctUntilChanged())
            .subscribe((connectionIds) => {
                const data = { connectionIds };
                this.store.dispatch(
                    updateListOfClientsConnectedToChannel(data)
                );
            });
    }

    sendCommandToRemoteClients(command: BeepCommand): void {
        this.hubConnection
            .send(
                'newMessage',
                command.freqInKhz.toString(),
                command.durationInSeconds.toString(),
                this.channel
            )
            .then(() => {
                this.logService.info('msg sent');
            });
    }

    leaveChannel(): Promise<any> {
        return this.hubConnection.send('removeFromChannel', this.channel);
    }

    addHandlers(channel: string) {
        this.hubConnection.onclose(() => {
            this.hubConnection.send('removeFromChannel', channel).then(() => {
                this.logService.info('removed from channel ' + channel);
            });
            this.logService.info('Disconnected');
        });

        this.hubConnection.on('addedToChannel', (connectionIds: string[]) => {
            const data = { connectionIds };
            this.store.dispatch(addClientToChannel(data));
        });

        this.hubConnection.on(
            'removedFromChannel',
            (connectionIds: string[]) => {
                const data = { connectionIds };
                this.store.dispatch(removeClientFromChannel(data));
            }
        );

        this.hubConnection.on(
            'messageReceived',
            (freqInKhz: string, durationInSeconds: string) => {
                this.logService.info(
                    `Got msg: ${freqInKhz}|${durationInSeconds}`
                );
                const beepCommand = {
                    freqInKhz: +freqInKhz,
                    durationInSeconds: +durationInSeconds,
                } as BeepCommand;
                this.store.dispatch(
                    beginPlayStart({ beepCommand: beepCommand })
                );
            }
        );
    }

    startConnection(channel: string): void {
        this.hubConnection
            .start()
            .then(() => {
                setTimeout(() => {
                    const connData = {
                        connectionId: this.hubConnection.connectionId ?? '',
                    };
                    this.store.dispatch(updateConnectionId(connData));                   

                    this.hubConnection
                        .send('addToChannel', channel)
                        .then(() => {
                            this.logService.info(
                                'addToChannel / dispatchInitialClientsInChannelCount'
                            );
                            this.dispatchInitialClientsInChannelCount(channel);
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
