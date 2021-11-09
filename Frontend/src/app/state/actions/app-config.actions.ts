import { createAction, props } from '@ngrx/store';

import { AppNotification } from 'src/app/core/models/app-notification';
import { ComponentType } from 'src/app/core/models/component-type';
import { AppConfigActionTypes } from './_app-action-types';

export const initStart = createAction(AppConfigActionTypes.initStart);
export const initOk = createAction(AppConfigActionTypes.initOk);
export const initError = createAction(
    AppConfigActionTypes.initError,
    props<{ errorMessage: string }>()
);

export const emitNotification = createAction(
    AppConfigActionTypes.emitNotification,
    props<{ appNotification: AppNotification }>()
);

export const expandPanel = createAction(
    AppConfigActionTypes.expandPanel,
    props<{ componentType: ComponentType }>()
);

export const collapsePanel = createAction(
    AppConfigActionTypes.collapsePanel,
    props<{ componentType: ComponentType }>()
);

export const updateComponentUiStates = createAction(
    AppConfigActionTypes.updateComponentUiStates,
    props<{
        componentUiStates: { [key in ComponentType]: { isExpanded: boolean } };
    }>() //TODO Extract type
);
