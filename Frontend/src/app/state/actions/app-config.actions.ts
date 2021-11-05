import { createAction, props } from '@ngrx/store';

import { AppNotification } from 'src/app/core/models/app-notification';
import { PanelType } from 'src/app/core/models/panel-type';
import { AppConfigActionTypes } from './_app-action-types';

const actions = AppConfigActionTypes;

export const initStart = createAction(actions.initStart);
export const initOk = createAction(actions.initOk);
export const initError = createAction(
    actions.initError,
    props<{ errorMessage: string }>()
);

export const emitNotification = createAction(
    actions.emitNotification,
    props<{ appNotification: AppNotification }>()
);

export const expandPanel = createAction(
    actions.expandPanel,
    props<{ panel: PanelType }>()
);

export const collapsePanel = createAction(
    actions.collapsePanel,
    props<{ panel: PanelType }>()
);

export const updatePanelStates = createAction(
    actions.updatePanelStates,
    props<{ panelStates: { [key in PanelType] : { isExpanded: boolean } } }>() //TODO Extract type
);
