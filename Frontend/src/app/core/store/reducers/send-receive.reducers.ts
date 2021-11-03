import { createReducer, on } from '@ngrx/store';

import { SendReceiveState } from '../../models/send-receive-state';
import * as actions from '../actions/send-receive.actions';

export const initialSendReceiveState: SendReceiveState = {
    channel: generateChannelName(),
    recentCommands: [],
}

export const sendReceiveReducer = createReducer(
    initialSendReceiveState,

    //TODO remove:
    on(actions.sendReceiveInit, (state, { channel }) => ({ 
        ...state,
        channel: channel
    })),

    on(actions.changeChannel, (state, { channel }) => ({ 
        ...state,
        channel: channel
    })),
);


function generateChannelName(): string {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
}