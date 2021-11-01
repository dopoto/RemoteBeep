import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { SendReceiveState } from '../models/send-receive-state';
import { PlaySoundsState } from '../models/play-sounds-state';
import { AppConfigState } from '../models/app-config-state';
import { hydrationMetaReducer } from './reducers/hydrate.meta.reducer';
import { playSoundsReducer } from './reducers/play-sounds.reducers';
import { appConfigReducer } from './reducers/app-config.reducers';
import { sendReceiveReducer } from './reducers/send-receive.reducers';
import { debugMetaReducer } from './reducers/debug.meta.reducer';

export interface AppState {
    sendReceive: SendReceiveState;
    playSounds: PlaySoundsState;
    appConfig: AppConfigState;
}

export const reducers: ActionReducerMap<AppState> = {
    sendReceive: sendReceiveReducer,
    playSounds: playSoundsReducer,
    appConfig: appConfigReducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer, debugMetaReducer];
