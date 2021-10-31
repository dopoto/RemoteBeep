import { createAction, props } from '@ngrx/store';
import { BeepCommand } from '../../models/beep-command';
import { SendReceiveState } from '../../models/send-receive-state';

import { SendReceiveActionTypes } from './_app-action-types';

const actions = SendReceiveActionTypes;

export const initStart = createAction(actions.initStart);
export const initOk = createAction(actions.initOk);
export const initError = createAction(
    actions.initError,
    props<{ errorMessage: string }>()
);

export const sendBeepCommandStart = createAction(
    actions.sendBeepCommandStart,
    props<{ beepCommand: BeepCommand }>()
);
export const sendBeepCommandOk = createAction(actions.sendBeepCommandOk);
export const sendBeepCommandError = createAction(
    actions.sendBeepCommandError,
    props<{ errorMessage: string }>()
);
