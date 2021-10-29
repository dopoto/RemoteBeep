import { createAction, props } from '@ngrx/store';

import { AppState } from '../app.state';
import { HydrateActionTypes } from './_app-action-types';

const actions = HydrateActionTypes;

// Load the app state from local storage:

export const hydrateStart = createAction(actions.hydrateStart);
export const hydrateOk = createAction(
    actions.hydrateOk,
    props<{ state: AppState }>()
);
export const hydrateError = createAction(
    actions.hydrateError,
    props<{ errorMessage: string }>()
);
