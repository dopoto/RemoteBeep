import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { SendReceiveState } from '../models/send-receive-state';
import { PlaySoundsState } from '../models/play-sounds-state';
import { AppConfigState } from '../models/app-config-state';
import * as sendReceive from './reducers/send-receive.reducers';
import * as playSounds from './reducers/play-sounds.reducers';
import * as appConfig from './reducers/app-config.reducers';

import { hydrationMetaReducer } from './reducers/hydrate.reducer';

export interface AppState {
    sendReceive: SendReceiveState;
    playSounds: PlaySoundsState;
    appConfig: AppConfigState;
}

export const reducers: ActionReducerMap<AppState> = {
    sendReceive: sendReceive.reducer,
    playSounds: playSounds.reducer,
    appConfig: appConfig.reducer
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
