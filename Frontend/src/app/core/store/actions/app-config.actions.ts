import { createAction, props } from '@ngrx/store';

import { AppConfigActionTypes } from './_app-action-types';

const actions = AppConfigActionTypes;

export const initStart = createAction(actions.initStart);
export const initOk = createAction(actions.initOk);
export const initError = createAction(
    actions.initError,
    props<{ errorMessage: string }>()
);
