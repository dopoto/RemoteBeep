import { createAction, props } from '@ngrx/store';

import { AppNotification } from 'src/app/core/models/app-notification';
import { ComponentType } from 'src/app/core/models/component-type';
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
    props<{ componentType: ComponentType }>()
);

export const collapsePanel = createAction(
    actions.collapsePanel,
    props<{ componentType: ComponentType }>()
);

export const updateComponentUiStates = createAction(
    actions.updateComponentUiStates,
    props<{ componentUiStates: { [key in ComponentType] : { isExpanded: boolean } } }>() //TODO Extract type
);
