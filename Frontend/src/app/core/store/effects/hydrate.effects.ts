import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { PlaySoundsMode } from '../../models/play-sounds-mode';

import { LogService } from '../../services/log/log.service';
import * as HydrationActions from '../actions/hydrate.actions';
import { AppState } from '../app.state';

@Injectable()
export class HydrateEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private router: Router,
        private logService: LogService
    ) {}

    /**
     * When the app is initialized, load its state from local storage or initialize a minimalstate.
     */
    hydrate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HydrationActions.hydrateStart),
            map(() => {
                const storageValue = localStorage.getItem('state');
                if (!storageValue) {
                    // Looks like it's our first run here. Let's pick a random
                    // signalR channel and initialize a minimal state.
                    const initialState: AppState = {
                        sendReceive: {
                            channel: (
                                Date.now().toString(36) +
                                Math.random().toString(36).substr(2, 5)
                            ).toUpperCase(),
                            recentCommands: [],
                        },
                        playSounds: {
                            mode: PlaySoundsMode.ControlOnly,
                            isPlaying: false,
                            freqInKhz: 0,
                            durationInSeconds: 0
                        },
                        //TODO:
                        meta: {
                            appVersion: '0.0.1', //environment.version,
                            stateVersion: '1',
                            initializedOn: new Date(),
                        },
                    };
                    return HydrationActions.hydrateOk({ state: initialState });
                } else {
                    // The app has been used before - let's load the state that
                    // we previously stored in local storage.
                    try {
                        const state = JSON.parse(storageValue) as AppState;
                        //TODO Determine if this is a valid, compatible state.
                        if (state && state.meta) {
                            state.meta.lastNotification = undefined;
                        }
                        if (state && state.sendReceive) {
                            state.sendReceive.recentCommands = [];
                        }
                        if (state && state.playSounds) {
                            state.playSounds.isPlaying = false;
                        }
                        return HydrationActions.hydrateOk({ state });
                    } catch {
                        localStorage.removeItem('state');
                    }
                }
                return HydrationActions.hydrateError({
                    errorMessage: 'Hydrate start error!',
                });
            })
        )
    );

    navigateToHome$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(HydrationActions.hydrateOk),
                tap((initState) => {
                    this.router.navigate([
                        'home',
                        {
                            channel: initState.state.sendReceive.channel,
                            mode: initState.state.playSounds.mode,
                        },
                    ]);
                })
            ),
        { dispatch: false }
    );

    serialize$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    HydrationActions.hydrateOk,
                    HydrationActions.hydrateError
                ),
                switchMap(() => this.store),
                distinctUntilChanged(),
                tap((state) => {
                    let parsedState = JSON.parse(JSON.stringify(state));
                    localStorage.setItem('state', JSON.stringify(parsedState));
                })
            ),
        { dispatch: false }
    );

    ngrxOnInitEffects(): Action {
        return HydrationActions.hydrateStart();
    }
}
