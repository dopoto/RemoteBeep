import { Action, createReducer, on } from '@ngrx/store';

import { SendReceiveState } from '../../models/send-receive-state';
import * as actions from '../actions/send-receive.actions';

export const initialState: SendReceiveState = {
     channel: '',
     recentCommands: []
}

const SendReceiveReducer = createReducer(
    initialState,

    // on(actions.initStart, (state) => ({ 
    //     ...state,
    //     i
    // })),
);

export function reducer(state: SendReceiveState | undefined, action: Action) {
    return SendReceiveReducer(state, action);
}
