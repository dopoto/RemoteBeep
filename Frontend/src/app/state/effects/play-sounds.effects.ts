import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, mergeMap, of } from 'rxjs';

import * as actions from '../actions/play-sounds.actions';
import { LogService } from 'src/app/core/services/log/log.service';

@Injectable()
export class PlaySoundsEffects {
    constructor(private actions$: Actions, private logService: LogService) {}

    changePlayMode$ = createEffect(
        () => this.actions$.pipe(ofType(actions.changePlayMode)),
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
        () => this.actions$.pipe(ofType(actions.changeFreq)),
        { dispatch: false }
    );

    changeDuration$ = createEffect(
        () => this.actions$.pipe(ofType(actions.changeDuration)),
        { dispatch: false }
    );
}
