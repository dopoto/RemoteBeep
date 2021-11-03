import { Injectable } from '@angular/core';
import { HubConnection, IHttpConnectionOptions } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { BeepCommand } from 'src/app/core/models/beep-command';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LogService } from '../log/log.service';
import {
    initStart,
    initOk,
    initError,
} from 'src/app/state/actions/app-config.actions';
import { beginPlayStart } from 'src/app/state/actions/play-sounds.actions';
import { selectChannel } from 'src/app/state/selectors/send-receive.selectors';

@Injectable({
    providedIn: 'root',
})
export class CommandService {
    private readonly baseUrl: string = environment.apiEndpoint;
    public hubConnection!: HubConnection;
    ngDestroyed$ = new Subject();

    public channel = '';

    constructor(
        private logService: LogService,
        private readonly store: Store
    ) {}

    init() {
        this.store
            .select(selectChannel)
            .pipe(takeUntil(this.ngDestroyed$))
            .subscribe((channel) => {
                this.channel = channel;
                this.store.dispatch(initStart());
                this.hubConnection = new signalR.HubConnectionBuilder()
                    .withUrl(this.baseUrl, <IHttpConnectionOptions>{
                        withCredentials: false,
                    })
                    .configureLogging(signalR.LogLevel.Information)
                    .build();
                this.hubConnection.onclose(() => {
                    this.hubConnection
                        .send('removeFromChannel', channel)
                        .then(() => {
                            this.logService.info(
                                'removed from channel ' + channel
                            );
                        });
                    this.logService.info('Disconnected');
                });
                this.hubConnection
                    .start()
                    .then(() => {
                        this.hubConnection
                            .send('addToChannel', channel)
                            .then((res) => {
                                //this.logService.info('added to channel');
                            });
                        this.store.dispatch(initOk());
                        this.logService.info('Connection started');
                    })
                    .catch((err) => {
                        this.logService.info(
                            'Error while starting connection: ' + err
                        );
                        this.store.dispatch(
                            initError({
                                errorMessage:
                                    'Error while initializing the application. Please refresh the page or try again later.',
                            })
                        );
                    });

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

                this.hubConnection.on('addedToChannel', (totalClientsInChannel: string) => {
                    this.logService.info('addedToChannel:' + totalClientsInChannel);
                });
            });
    }

    sendCommandToRemoteClients(command: BeepCommand, channel: string): void {
        this.hubConnection
            .send(
                'newMessage',
                command.freqInKhz.toString(),
                command.durationInSeconds.toString(),
                channel //TODO use this.channel
            )
            .then(() => {
                this.logService.info('msg sent');
            });
    }

    onMessageReceived(freqInKhz: string, durationInSeconds: string) {
        this.logService.info(
            'Message received!:' + freqInKhz + '|' + durationInSeconds
        );
        const beepCommand = {
            freqInKhz: +freqInKhz,
            durationInSeconds: +durationInSeconds,
        } as BeepCommand;
        this.store.dispatch(beginPlayStart({ beepCommand: beepCommand }));
    }

    leaveChannel(): Promise<any> {
       return this.hubConnection
            .send(
                'removeFromChannel',
                this.channel
            );
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
