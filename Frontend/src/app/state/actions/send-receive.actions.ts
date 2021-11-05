import { createAction, props } from '@ngrx/store';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { SendReceiveActionTypes } from './_app-action-types';

const actions = SendReceiveActionTypes;

export const changeChannel = createAction(
    actions.changeChannel,
    props<{ channel: string }>()
);

export const updateConnectionId = createAction(
    actions.updateConnectionId,
    /**
     * connectionId: the Id of the current device..
     */
    props<{ connectionId: string }>()
);

export const addClientToChannel = createAction(
    actions.addClientToChannel,
    /**
     * connectionIds: the list of connected clients after the add operation.
     */
    props<{ addedConnectionId: string, connectionIds: string[] }>()
);

export const removeClientFromChannel = createAction(
    actions.removeClientFromChannel,
    /**
     * connectionIds: the list of connected clients after the remove operation.
     */
    props<{ removedConnectionId: string, connectionIds: string[] }>()
);

export const updateListOfClientsConnectedToChannel = createAction(
    actions.updateListOfClientsConnectedToChannel,
    props<{ connectionIds: string[] }>()
);

export const changeChannelOk = createAction(actions.changeChannelOk);

export const sendBeepCommandStart = createAction(
    actions.sendBeepCommandStart,
    props<{ beepCommand: BeepCommand }>()
);
export const sendBeepCommandOk = createAction(actions.sendBeepCommandOk);
export const sendBeepCommandError = createAction(
    actions.sendBeepCommandError,
    props<{ errorMessage: string }>()
);

export const sendStopCommand = createAction(actions.sendStopCommand);
