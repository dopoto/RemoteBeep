import { Injectable } from '@angular/core';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { CommandService } from 'src/app/core/services/command/command.service';
import { LogService } from 'src/app/core/services/log/log.service';
import * as actions from '../actions/send-receive.actions';
import { sendBeepCommandOk } from '../actions/send-receive.actions';
import { emitNotification } from '../actions/app-config.actions';
import { AppNotification } from 'src/app/core/models/app-notification';
import { selectConnectionId } from '../selectors/send-receive.selectors';

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

                this.commandService.sendPlayCommandToRemoteClients(
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

    sendStopCommand$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.sendStopCommand),
                tap(() => {
                    // TODO Handle errors
                    this.commandService.sendStopCommandToRemoteClients();
                })
            ),
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
        () =>
            this.actions$.pipe(
                ofType(actions.addClientToChannel),
                concatLatestFrom(() => this.store.select(selectConnectionId)),
                tap(([{ addedConnectionId }, connectionId]) => {
                    if (addedConnectionId !== connectionId) {
                        const appNotification: AppNotification = {
                            text: 'A new client has joined your channel!',
                            type: 'info',
                        };
                        this.store.dispatch(
                            emitNotification({ appNotification })
                        );
                    }
                })
            ),
        { dispatch: false }
    );

    removeClientFromChannel$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.removeClientFromChannel),
                concatLatestFrom(() => this.store.select(selectConnectionId)),
                tap(([{ removedConnectionId }, connectionId]) => {
                    if (removedConnectionId !== connectionId) {
                        const appNotification: AppNotification = {
                            text: 'A  client has leftt your channel',
                            type: 'info',
                        };
                        this.store.dispatch(
                            emitNotification({ appNotification })
                        );
                    }
                })
            ),
        { dispatch: false }
    );
}
