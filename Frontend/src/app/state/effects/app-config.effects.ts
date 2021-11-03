import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as actions from '../actions/app-config.actions'; 
import { emitNotification } from '../actions/app-config.actions';
import { AppNotification } from 'src/app/core/models/app-notification';
import { LogService } from 'src/app/core/services/log/log.service';

@Injectable()
export class AppConfigEffects {
    constructor(
        private actions$: Actions,
        private logService: LogService,
        private readonly store: Store
    ) {}

    initStart$ = createEffect(
        () => this.actions$.pipe(ofType(actions.initStart)),
        { dispatch: false }
    );

    initOk$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.initOk),
                tap(() => {
                    const appNotification: AppNotification = {
                        text: 'Connected to server.',
                        type: 'info'
                    }
                    this.store.dispatch(emitNotification({appNotification}));
                })
            ),
        {
            dispatch: false,
        }
    );

    // TODO keep?
    initError$ = createEffect(
        () => this.actions$.pipe(
            ofType(actions.initError),
            tap(() => {
                const appNotification: AppNotification = {
                    text: 'Could not connect to server.',
                    type: 'error'
                }
                this.store.dispatch(emitNotification({appNotification}));
            })
            ),
        { dispatch: false }
    );

    emitNotification$ = createEffect(
        () => this.actions$.pipe(ofType(actions.emitNotification)),
        { dispatch: false }
    );
}
