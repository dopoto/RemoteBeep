import { createAction, props } from '@ngrx/store';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { SendReceiveActionTypes } from './_app-action-types';

const actions = SendReceiveActionTypes;

export const changeGroup = createAction(
    actions.changeGroup,
    props<{ group: string }>()
);

export const updateConnectionId = createAction(
    actions.updateConnectionId,
    /**
     * connectionId: the Id of the current device..
     */
    props<{ connectionId: string }>()
);

export const addClientToGroup = createAction(
    actions.addClientToGroup,
    /**
     * connectionIds: the list of connected clients after the add operation.
     */
    props<{ addedConnectionId: string, connectionIds: string[] }>()
);

export const removeClientFromGroup = createAction(
    actions.removeClientFromGroup,
    /**
     * connectionIds: the list of connected clients after the remove operation.
     */
    props<{ removedConnectionId: string, connectionIds: string[] }>()
);

export const updateListOfClientsConnectedToGroup = createAction(
    actions.updateListOfClientsConnectedToGroup,
    props<{ connectionIds: string[] }>()
);

export const changeGroupOk = createAction(actions.changeGroupOk);

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
