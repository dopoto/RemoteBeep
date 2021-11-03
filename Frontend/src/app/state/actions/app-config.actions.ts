import { createAction, props } from '@ngrx/store';

import { AppNotification } from 'src/app/core/models/app-notification';
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