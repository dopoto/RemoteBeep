import { createReducer, on } from '@ngrx/store';
import { PanelType } from 'src/app/core/models/panel-type';
import { environment } from 'src/environments/environment';

import * as actions from '../actions/app-config.actions';
import { AppConfigState } from '../models/app-config-state';

export const initialAppConfigState: AppConfigState = {
    appVersion: environment.version,
    stateVersion: '1',
    initializedOn: new Date(),
    isLoading: false,
    isConnectedToServer: false,
    isInGeneralError: false,
    panelStates: {
        [PanelType.GroupInfo]: { isExpanded: false },
        [PanelType.PlayMode]: { isExpanded: true },
        [PanelType.SoundPlayer]: { isExpanded: true },
        [PanelType.Control]: { isExpanded: true },
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

    on(actions.initError, (state) => ({
        ...state,
        isConnectedToServer: false,
        isLoading: false,
        isInGeneralError: true,
    })),

    on(actions.emitNotification, (state, { appNotification }) => ({
        ...state,
        lastNotification: appNotification,
    })),

    on(actions.updatePanelStates, (state, { panelStates }) => ({
        ...state,
        panelStates: panelStates
    })),
);
