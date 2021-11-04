import { createAction, props } from '@ngrx/store';

import { BeepCommand } from 'src/app/core/models/beep-command'; 
import { SendReceiveActionTypes } from './_app-action-types';

const actions = SendReceiveActionTypes;

export const changeChannel = createAction(
    actions.changeChannel,
    props<{ channel: string }>()
);

export const addClientToChannel = createAction(
    actions.addClientToChannel,
    props<{ newChannelMembersCount: number }>()
);

export const removeClientFromChannel = createAction(
    actions.removeClientFromChannel,
    props<{ newChannelMembersCount: number }>()
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
