import { Injectable } from '@angular/core';
import { HubConnection, IHttpConnectionOptions } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { BeepCommand } from 'src/app/core/models/beep-command';
import { LogService } from '../log/log.service';
import { Store } from '@ngrx/store';
import { beginPlayStart } from '../../store/actions/play-sounds.actions';

import { environment } from 'src/environments/environment';
import {
    initError,
    initOk,
    initStart,
} from '../../store/actions/app-config.actions';
import { selectChannel } from '../../store/selectors/send-receive.selectors';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommandService {
    private readonly baseUrl: string = environment.apiEndpoint;
    public hubConnection!: HubConnection;
    ngDestroyed$ = new Subject();

    constructor(
        private logService: LogService,
        private readonly store: Store
    ) {}

    init() {
        this.store
            .select(selectChannel)
            .pipe(takeUntil(this.ngDestroyed$))
            .subscribe((channel) => {
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
                            .then(() => {
                                this.logService.info(
                                    'added to channel ' + channel
                                );
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
                            'Message received!:' +
                                freqInKhz +
                                '|' +
                                durationInSeconds
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
            });
    }

    sendCommandToRemoteClients(command: BeepCommand, channel: string): void {
        this.hubConnection
            .send(
                'newMessage',
                command.freqInKhz.toString(),
                command.durationInSeconds.toString(),
                channel
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

    // TODO Revisit
    ngOnDestroy() {
        this.ngDestroyed$.next(null);
        // this.logService.info('destroying');
        // this.hubConnection.stop().then(() => {
        //     this.logService.info('destroyed');
        // });
    }
}
