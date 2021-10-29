import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { SendReceiveState } from '../models/send-receive-state';
import { PlaySoundsState } from '../models/play-sounds-state';
import { MetaState } from '../models/meta-state';
import * as sendReceive from './reducers/send-receive.reducers';
import * as playSounds from './reducers/play-sounds.reducers';
import * as meta from './reducers/meta.reducers';

import { hydrationMetaReducer } from './reducers/hydrate.reducer';

export interface AppState {
    sendReceive: SendReceiveState;
    playSounds: PlaySoundsState;
    meta: MetaState;
}

export const reducers: ActionReducerMap<AppState> = {
    sendReceive: sendReceive.reducer,
    playSounds: playSounds.reducer,
    meta: meta.reducer
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
