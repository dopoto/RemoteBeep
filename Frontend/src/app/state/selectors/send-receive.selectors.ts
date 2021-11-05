import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SendReceiveState } from '../models/send-receive-state';

export const sendReceiveSelector =
    createFeatureSelector<SendReceiveState>('sendReceive');

export const selectGroup = createSelector(
    sendReceiveSelector,
    (state: SendReceiveState) => state?.group
);

export const selectConnectionId = createSelector(
    sendReceiveSelector,
    (state: SendReceiveState) => state?.connectionId
);

/**
 * Returns the number of other devices in the current group.
 */
export const selectOtherDevicesCount = createSelector(
    sendReceiveSelector,
    selectConnectionId,
    (state: SendReceiveState, connectionId) =>
        state?.devicesInGroup?.filter((c) => c !== connectionId).length
);
