import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
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
            map((data) => {
                // TODO Handle errors
                this.commandService.sendPlayCommandToRemoteClients(
                    data.beepCommand
                );
                return sendBeepCommandOk();
            })
        )
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

    addClientToGroup$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.addClientToGroup),
                concatLatestFrom(() => this.store.select(selectConnectionId)),
                tap(([{ addedConnectionId }, connectionId]) => {
                    if (addedConnectionId !== connectionId) {
                        const appNotification: AppNotification = {
                            text: 'A new client has joined your group!',
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

    removeClientFromGroup$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.removeClientFromGroup),
                concatLatestFrom(() => this.store.select(selectConnectionId)),
                tap(([{ removedConnectionId }, connectionId]) => {
                    if (removedConnectionId !== connectionId) {
                        const appNotification: AppNotification = {
                            text: 'A  client has left your group',
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
