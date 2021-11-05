import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions/send-receive.actions';
import { SendReceiveState } from '../models/send-receive-state';

export const initialSendReceiveState: SendReceiveState = {
    channel: generateChannelName(),
    recentCommands: [],
}

export const sendReceiveReducer = createReducer(
    initialSendReceiveState,

    on(actions.changeChannel, (state, { channel }) => ({ 
        ...state,
        channel: channel
    })),

    on(actions.updateConnectionId, (state, { connectionId }) => ({ 
        ...state,
        connectionId: connectionId
    })),

    on(actions.addClientToChannel, (state, { connectionIds }) => ({ 
        ...state,
        devicesInChannel: connectionIds
    })),
    
    on(actions.removeClientFromChannel, (state, { connectionIds }) => ({ 
        ...state,
        devicesInChannel: connectionIds
    })),    
    
    on(actions.updateListOfClientsConnectedToChannel, (state, { connectionIds }) => ({ 
        ...state,
        devicesInChannel: connectionIds
    })),    
);


function generateChannelName(): string {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
}