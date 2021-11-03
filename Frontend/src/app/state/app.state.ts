import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { hydrationMetaReducer } from './reducers/hydrate.meta.reducer';
import { playSoundsReducer } from './reducers/play-sounds.reducers';
import { appConfigReducer } from './reducers/app-config.reducers';
import { sendReceiveReducer } from './reducers/send-receive.reducers';
import { debugMetaReducer } from './reducers/debug.meta.reducer';
import { AppConfigState } from './models/app-config-state';
import { PlaySoundsState } from './models/play-sounds-state';
import { SendReceiveState } from './models/send-receive-state';

export interface AppState {
    appConfig: AppConfigState;
    sendReceive: SendReceiveState;
    playSounds: PlaySoundsState;
    router?:  RouterReducerState<any>,
}

export const reducers: ActionReducerMap<AppState> = {
    appConfig: appConfigReducer,
    sendReceive: sendReceiveReducer,
    playSounds: playSoundsReducer,
    router: routerReducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer, debugMetaReducer];

// TODO https://itnext.io/ngrx-store-testing-cheat-sheet-59e069eb47c
