import { Action, createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { AppConfigState } from '../../models/app-config-state';
import * as actions from '../actions/app-config.actions';

export const initialAppConfigState: AppConfigState = {
    appVersion: environment.version,
    stateVersion: '1',
    initializedOn: new Date(),
    isLoading: false,
    isConnectedToServer: false,
    isInGeneralError: false,
};

export const appConfigReducer = createReducer(
    initialAppConfigState,

    on(actions.initStart, (state) => ({
        ...state,
        isConnectedToServer: false,
        isLoading: true,
        isInGeneralError: false,
    })),

    on(actions.initOk, (state) => ({
        ...state,
        isConnectedToServer: true,
        isLoading: false,
        isInGeneralError: false,
    })),

    on(actions.initError, (state) => ({
        ...state,
        isConnectedToServer: false,
        isLoading: false,
        isInGeneralError: true,
    })),
    
    on(actions.emitNotification, (state, { appNotification }) => ({
        ...state,
        lastNotification: appNotification
    })),
);
