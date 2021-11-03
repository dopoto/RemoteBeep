import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
    Actions,
    concatLatestFrom,
    createEffect,
    ofType,
    OnInitEffects,
} from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import {
    distinctUntilChanged,
    map,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { getSelectors, routerNavigatedAction } from '@ngrx/router-store';

import { environment } from 'src/environments/environment';
import { LogService } from '../../services/log/log.service';
import * as hydrateActions from '../actions/hydrate.actions';
import * as sendReceiveActions from '../actions/send-receive.actions';
import { AppState } from '../app.state';
import { initialPlaySoundsState } from '../reducers/play-sounds.reducers';
import { initialAppConfigState } from '../reducers/app-config.reducers';
import { initialSendReceiveState } from '../reducers/send-receive.reducers';
import {
    selectCurrentRoute,
    selectQueryParam,
    selectQueryParams,
    selectRouteData,
    selectRouteParam,
    selectRouteParams,
} from '../selectors/router.selectors';

@Injectable()
export class HydrateEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private logService: LogService
    ) {}

    getInitialState(): AppState {
        const initialState: AppState = {
            appConfig: initialAppConfigState,
            sendReceive: initialSendReceiveState,
            playSounds: initialPlaySoundsState,
        };
        return initialState;
    }

    getStateFromLocalStorage(storageValue: any): AppState {
        let state = JSON.parse(JSON.stringify(this.getInitialState()));

        const storageState = JSON.parse(storageValue) as AppState;
        if (storageState) {
            const ps = storageState.playSounds;
            if (ps) {
                if (ps.durationInSeconds) {
                    state.playSounds.durationInSeconds = ps.durationInSeconds;
                }
                if (ps.freqInKhz) {
                    state.playSounds.freqInKhz = ps.freqInKhz;
                }
                if (ps.mode) {
                    state.playSounds.mode = ps.mode;
                }
            }

            const sr = storageState.sendReceive;
            if (sr) {
                if (sr.channel) {
                    state.sendReceive.channel = sr.channel;
                }
            }
        }
        return state;
    }

    /**
     * When the app is initialized, load its state from local storage or initialize a minimalstate.
     */
    hydrate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(hydrateActions.hydrateStart),
            map(() => {
                const storageValue = localStorage.getItem('state');
                let state: AppState = {} as AppState;
                if (!storageValue) {
                    state = this.getInitialState();
                } else {
                    // The app has been used before - let's load the state that
                    // we previously stored in local storage.
                    try {
                        state = this.getStateFromLocalStorage(storageValue);
                    } catch (ex) {
                        localStorage.removeItem('state');
                    }
                }

                this.router.navigate(['/home', {channel: state.sendReceive.channel}]);

                return hydrateActions.hydrateOk({state});

                // TODO
                // return HydrationActions.hydrateError({
                //     errorMessage: 'Hydrate start error!',
                // });
            })
        )
    );

    // updateChannel$ = createEffect(
    //     () =>
    //         this.actions$.pipe(
    //             //ofType(routerNavigatedAction),
    //             ofType(HydrationActions.hydrateOk),
    //             //concatLatestFrom(() => this.store.pipe(select(selectCurrentRoute))),
    //             //concatLatestFrom(() => this.store.select(selectRouteData)),
    //             withLatestFrom(this.store.pipe(select(selectRouteParams))),
    //             map(([initState, r]) => {
    //                  debugger;
    //                 // const currentChannel = initState.state.sendReceive.channel;
    //                 // const routeChannel = this.route.snapshot.paramMap.get('mychannel'); // TODO why is it null?

    //                 // const channel = (routeChannel && routeChannel !== currentChannel) ? routeChannel : currentChannel;

    //                 // this.router.navigate(['/home', {mychannel: channel}]);

    //                 // return sendReceiveActions.changeChannel({channel});
    //             })
    //         ),
    //     { dispatch: false }
    // );

    serialize$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    hydrateActions.hydrateOk,
                    hydrateActions.hydrateError
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
        return hydrateActions.hydrateStart();
    }
}
