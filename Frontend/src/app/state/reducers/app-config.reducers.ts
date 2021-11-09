import { createReducer, on } from '@ngrx/store';
import { ComponentType } from 'src/app/core/models/component-type';
import { environment } from 'src/environments/environment';

import * as actions from '../actions/app-config.actions';
import { AppConfigState } from '../models/app-config-state';

export const initialAppConfigState: AppConfigState = {
    isLoading: false,
    isConnectedToServer: false,
    isInGeneralError: false,
    componentUiStates: {
        [ComponentType.GroupInfo]: { isExpanded: true },
        [ComponentType.PlayMode]: { isExpanded: true },
        [ComponentType.SoundPlayer]: { isExpanded: true },
        [ComponentType.Control]: { isExpanded: true },
    },
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

    on(actions.initError, (state, { errorMessage}) => ({
        ...state,
        isConnectedToServer: false,
        isLoading: false,
        isInGeneralError: true,
        //TODO errorMessage?
    })),

    on(actions.emitNotification, (state, { appNotification }) => ({
        ...state,
        lastNotification: appNotification,
    })),

    on(actions.updateComponentUiStates, (state, { componentUiStates }) => ({
        ...state,
        componentUiStates: componentUiStates
    })),
);
