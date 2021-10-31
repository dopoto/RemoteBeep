import { Action, createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { AppConfigState } from '../../models/app-config-state';
import * as actions from '../actions/app-config.actions';

export const initialState: AppConfigState = {
    appVersion: environment.version,
    stateVersion: '1',
    initializedOn: new Date(),
    isLoading: false,
    isConnectedToServer: false
};

const appConfigReducer = createReducer(
    initialState,

    on(actions.initStart, (state) => ({ 
        ...state,
        isConnectedToServer: false,
        isLoading: true
    })),
    
    on(actions.initOk, (state) => ({ 
        ...state,
        isConnectedToServer: true,
        isLoading: false
    })),
    
    on(actions.initError, (state) => ({ 
        ...state,
        isConnectedToServer: false,
        isLoading: false
    })),
);

export function reducer(state: AppConfigState | undefined, action: Action) {
    return appConfigReducer(state, action);
}
