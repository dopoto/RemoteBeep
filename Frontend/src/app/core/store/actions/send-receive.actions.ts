import { createAction, props } from '@ngrx/store';

import { BeepCommand } from '../../models/beep-command';
import { SendReceiveActionTypes } from './_app-action-types';

const actions = SendReceiveActionTypes;

export const sendBeepCommandStart = createAction(
    actions.sendBeepCommandStart,
    props<{ beepCommand: BeepCommand }>()
);
export const sendBeepCommandOk = createAction(actions.sendBeepCommandOk);
export const sendBeepCommandError = createAction(
    actions.sendBeepCommandError,
    props<{ errorMessage: string }>()
);
