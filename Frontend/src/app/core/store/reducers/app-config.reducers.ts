import { Action, createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { AppConfigState } from '../../models/app-config-state';
import * as sendReceiveActions from '../actions/send-receive.actions';

export const initialState: AppConfigState = {
    appVersion: environment.version,
    stateVersion: '1',
    initializedOn: new Date(),
};

const appConfigReducer = createReducer(
    initialState,

    on(sendReceiveActions.initError, (state, { errorMessage }) => ({ 
        ...state,
        lastNotification: {
            text: errorMessage,
            type: 'error'
        }
    })),
);

export function reducer(state: AppConfigState | undefined, action: Action) {
    return appConfigReducer(state, action);
}
