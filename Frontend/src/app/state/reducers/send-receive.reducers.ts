import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions/send-receive.actions';
import { SendReceiveState } from '../models/send-receive-state';

export const initialSendReceiveState: SendReceiveState = {
    group: generateGroupName(),
    recentCommands: [],
}

export const sendReceiveReducer = createReducer(
    initialSendReceiveState,

    on(actions.changeGroup, (state, { group }) => ({ 
        ...state,
        group: group
    })),

    on(actions.updateConnectionId, (state, { connectionId }) => ({ 
        ...state,
        connectionId: connectionId
    })),

    on(actions.addClientToGroup, (state, { connectionIds }) => ({ 
        ...state,
        devicesInGroup: connectionIds
    })),
    
    on(actions.removeClientFromGroup, (state, { connectionIds }) => ({ 
        ...state,
        devicesInGroup: connectionIds
    })),    
    
    on(actions.updateListOfClientsConnectedToGroup, (state, { connectionIds }) => ({ 
        ...state,
        devicesInGroup: connectionIds
    })),    
);


function generateGroupName(): string {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
}