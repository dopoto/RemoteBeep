import { ActionReducer } from '@ngrx/store';

export function debugMetaReducer(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    return function (state, action) {
        //// Enable these to state and action debug info in the console.
        // console.log('state', state);
        // console.log('action', action);
        return reducer(state, action);
    };
}
