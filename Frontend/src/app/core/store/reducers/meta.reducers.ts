import { Action, createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { MetaState } from '../../models/meta-state';
import * as sendReceiveActions from '../actions/send-receive.actions';

export const initialState: MetaState = {
    appVersion: environment.version,
    stateVersion: '1',
    initializedOn: new Date(),
};

const metaReducer = createReducer(
    initialState,

    on(sendReceiveActions.initError, (state, { errorMessage }) => ({ 
        ...state,
        lastNotification: {
            text: errorMessage,
            type: 'error'
        }
    })),
);

export function reducer(state: MetaState | undefined, action: Action) {
    return metaReducer(state, action);
}
