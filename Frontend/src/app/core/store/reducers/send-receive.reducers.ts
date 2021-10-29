import { Action, createReducer, on } from '@ngrx/store';

import { SendReceiveState } from '../../models/send-receive-state';
import * as SendReceiveActions from '../actions/send-receive.actions';

export const initialState: SendReceiveState = {
     channel: '',
     recentCommands: []
}

const SendReceiveReducer = createReducer(
    initialState,

    // on(SendReceiveActions., () => ({
         
    // })),

    // on(SendReceiveActions.playStop, () => ({
        
    // })),
);

export function reducer(state: SendReceiveState | undefined, action: Action) {
    return SendReceiveReducer(state, action);
}
