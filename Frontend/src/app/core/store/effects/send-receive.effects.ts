import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import {
    map,
    mergeMap,
    tap,
} from 'rxjs/operators';
import { CommandService } from '../../services/command/command.service';

import { LogService } from '../../services/log/log.service';
import * as actions from '../actions/send-receive.actions';
import {
    sendBeepCommandOk,
} from '../actions/send-receive.actions';

@Injectable()
export class SendReceiveEffects {
    constructor(
        private actions$: Actions,
        private commandService: CommandService,
        private logService: LogService
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
                        return sendBeepCommandOk(data);
                    })
                );
            })
        )
    );

    sendBeepCommandOk$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.sendBeepCommandOk),
                tap(() => {})
            ),
        { dispatch: false }
    );
}
