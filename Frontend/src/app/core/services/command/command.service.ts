import { Injectable } from '@angular/core';
import { HubConnection, IHttpConnectionOptions } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { BeepCommand } from 'src/app/core/models/beep-command';
import { LogService } from '../log/log.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { beginPlayStart } from '../../store/actions/play-sounds.actions';
import { initError } from '../../store/actions/send-receive.actions';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CommandService {
    private readonly baseUrl: string = environment.apiEndpoint;
    public hubConnection!: HubConnection;

    constructor(
        private logService: LogService,
        private readonly store: Store<AppState>
    ) {}

    init() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.baseUrl, <IHttpConnectionOptions>{
                withCredentials: false,
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();
        this.hubConnection.onclose(() => this.logService.info('Disconnected'));
        this.hubConnection
            .start()
            .then(() => this.logService.info('Connection started'))
            .catch((err) => {
                this.logService.info('Error while starting connection: ' + err);
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
                    'Message received!:' + freqInKhz + '|' + durationInSeconds
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

    sendCommandToRemoteClients(command: BeepCommand): void {
        this.hubConnection
            .send(
                'newMessage',
                command.freqInKhz.toString(),
                command.durationInSeconds.toString()
            )
            .then(() => {
                this.logService.info('Connection started');
            });
    }
}
