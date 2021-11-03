import { createAction, props } from '@ngrx/store';

import { BeepCommand } from '../../models/beep-command';
import { SendReceiveActionTypes } from './_app-action-types';

const actions = SendReceiveActionTypes;

export const sendReceiveInit = createAction(
    actions.sendReceiveInit,
    props<{ channel: string }>()
);

export const changeChannel = createAction(
    actions.changeChannel,
    props<{ channel: string }>()
);

export const changeChannelOk = createAction(
    actions.changeChannelOk
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
