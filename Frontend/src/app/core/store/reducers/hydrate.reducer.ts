import { Action, ActionReducer } from '@ngrx/store';
import * as HydrationActions from '../actions/hydrate.actions';

import { AppState } from '../app.state';

function isHydrateSuccess(
    action: Action
): action is ReturnType<typeof HydrationActions.hydrateOk> {
    return action.type === HydrationActions.hydrateOk.type;
}

export const hydrationMetaReducer = (
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
    return (state, action) => {
        if (isHydrateSuccess(action)) {
            return action.state;
        } else {
            return reducer(state, action);
        }
    };
};
