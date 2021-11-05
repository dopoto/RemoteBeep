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

    requestPlay$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.requestPlay),
                map((res) => {
                    const props = { beepCommand: res.beepCommand };
                    return actions.playOk(props);
                })
            ),
        { dispatch: true }
    );

    playOk$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.playOk),
                mergeMap((res) => {
                    return of(res).pipe(
                        delay(res.beepCommand.durationInSeconds * 1000)
                    );
                }),
                map(() => {
                    return actions.stopOk();
                })
            ),
        { dispatch: true }
    );

    requestStop$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.requestStop),
                map(() => {
                    return actions.stopOk();
                })
            ),
        { dispatch: true }
    );

    stopOk$ = createEffect(
        () => this.actions$.pipe(ofType(actions.stopOk)),
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
