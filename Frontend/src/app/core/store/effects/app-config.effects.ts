import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, interval, map, mergeMap, of, switchMap, tap } from 'rxjs';

import * as actions from '../actions/app-config.actions';
import { LogService } from '../../services/log/log.service';

@Injectable()
export class PlaySoundsEffects {
    constructor(private actions$: Actions, private logService: LogService) {}

    initStart$ = createEffect(
        () => this.actions$.pipe(ofType(actions.initStart)),
        { dispatch: false }
    );

    initOk$ = createEffect(() => this.actions$.pipe(ofType(actions.initOk)), {
        dispatch: false,
    });

    initError$ = createEffect(
        () => this.actions$.pipe(ofType(actions.initError)),
        { dispatch: false }
    );
}
