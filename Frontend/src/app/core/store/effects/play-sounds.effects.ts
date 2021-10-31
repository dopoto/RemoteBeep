import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, interval, map, mergeMap, of, switchMap, tap } from 'rxjs';

import * as actions from '../actions/play-sounds.actions';
import { LogService } from '../../services/log/log.service';

@Injectable()
export class PlaySoundsEffects {
    constructor(private actions$: Actions, private logService: LogService) {}

    changePlayModeStart$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.changePlayModeStart),
                map((res) => {
                    // TODO Save to local storage (??)
                    const props = { newPlayMode: res.newPlayMode };
                    return actions.changePlayModeOk(props);
                })
            ),
        { dispatch: true }
    );

    changePlayModeOk$ = createEffect(
        () => this.actions$.pipe(ofType(actions.changePlayModeOk)),
        { dispatch: false }
    );

    beginPlayStart$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.beginPlayStart),
                map((res) => {
                    const props = { beepCommand: res.beepCommand };
                    return actions.beginPlayOk(props);
                })
            ),
        { dispatch: true }
    );

    beginPlayOk$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.beginPlayOk),
                mergeMap((res) => {
                    return of(res).pipe(
                        delay(res.beepCommand.durationInSeconds * 1000)
                    );
                }),
                map(() => {
                    return actions.stopPlayOk();
                })
            ),
        { dispatch: true }
    );

    stopPlayOk$ = createEffect(
        () => this.actions$.pipe(ofType(actions.stopPlayOk)),
        { dispatch: false }
    );

    changeFreqStart$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.changeFreqStart),
                map(() => {
                    return actions.changeFreqOk();
                })
            ),
        { dispatch: true }
    );

    changeFreqOk$ = createEffect(
        () => this.actions$.pipe(ofType(actions.changePlayModeOk)),
        { dispatch: false }
    );

    changeDurationStart$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.changeDurationStart),
                map(() => {
                    return actions.changeDurationOk();
                })
            ),
        { dispatch: true }
    );

    changeDurationOk$ = createEffect(
        () => this.actions$.pipe(ofType(actions.changeDurationOk)),
        { dispatch: false }
    );
}
