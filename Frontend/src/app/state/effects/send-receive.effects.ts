import { Injectable } from '@angular/core';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { CommandService } from 'src/app/core/services/command/command.service';
import { LogService } from 'src/app/core/services/log/log.service'; 
import * as actions from '../actions/send-receive.actions';
import { sendBeepCommandOk } from '../actions/send-receive.actions';
import { selectChannel } from '../selectors/send-receive.selectors';

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
            concatLatestFrom(() => this.store.select(selectChannel)),
            mergeMap(([data, channel]) => {
                // TODO Handle errors
                const dbg = JSON.stringify(data.beepCommand);
                this.logService.info(`Sending ${dbg}`);

                this.commandService.sendCommandToRemoteClients(
                    data.beepCommand,
                    channel
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
}
