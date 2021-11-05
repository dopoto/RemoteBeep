import { Injectable } from '@angular/core';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CommandService } from 'src/app/core/services/command/command.service';
import { LogService } from 'src/app/core/services/log/log.service'; 
import * as actions from '../actions/send-receive.actions';
import { sendBeepCommandOk } from '../actions/send-receive.actions';
import { emitNotification } from '../actions/app-config.actions';
import { AppNotification } from 'src/app/core/models/app-notification';

@Injectable()
export class SendReceiveEffects {
    constructor(
        private actions$: Actions,
        private commandService: CommandService,
        private logService: LogService,
        private store: Store
    ) {}

    sendBeepCommandStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.sendBeepCommandStart),
            mergeMap((data) => {
                // TODO Handle errors
                const dbg = JSON.stringify(data.beepCommand);
                this.logService.info(`Sending ${dbg}`);

                this.commandService.sendCommandToRemoteClients(
                    data.beepCommand
                );

                // TODO Revisit
                return from(EMPTY).pipe(
                    map(() => {
                        return sendBeepCommandOk();
                    })
                );
            })
        )
    );

    sendBeepCommandOk$ = createEffect(
        () => this.actions$.pipe(ofType(actions.sendBeepCommandOk)),
        { dispatch: false }
    );

    // TODO Join new channel on server.
    changeChannel$ = createEffect(
        () => this.actions$.pipe(ofType(actions.changeChannel)),
        { dispatch: false }
    );
    
    changeChannelOk$ = createEffect(
        () => this.actions$.pipe(ofType(actions.changeChannelOk)),
        { dispatch: false }
    );

    addClientToChannel$ = createEffect(
        () => this.actions$.pipe(
            ofType(actions.addClientToChannel),
            tap(() => {
                const appNotification: AppNotification = {
                    text: 'A new client has joined your channel!',
                    type: 'info'
                }
                this.store.dispatch(emitNotification({appNotification}));
            })
        ),
        { dispatch: false }
    );
    
    removeClientFromChannel$ = createEffect(
        () => this.actions$.pipe(
            ofType(actions.removeClientFromChannel),
            tap(() => {
                const appNotification: AppNotification = {
                    text: 'A client has left your channel.',
                    type: 'info'
                }
                this.store.dispatch(emitNotification({appNotification}));
            })
        ),
        { dispatch: false }
    );
}
