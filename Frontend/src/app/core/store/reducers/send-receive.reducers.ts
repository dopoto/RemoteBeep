import { Action, createReducer, on } from '@ngrx/store';

import { SendReceiveState } from '../../models/send-receive-state';
import * as actions from '../actions/send-receive.actions';

export const initialState: SendReceiveState = {
     channel: '',
     recentCommands: []
}

export const sendReceiveReducer = createReducer(
    initialState,

    // on(actions.initStart, (state) => ({ 
    //     ...state,
    //     i
    // })),
);