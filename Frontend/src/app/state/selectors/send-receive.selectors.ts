import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SendReceiveState } from '../models/send-receive-state';

export const sendReceiveSelector = createFeatureSelector<SendReceiveState>('sendReceive');

export const selectChannel = createSelector(
    sendReceiveSelector,
    (state: SendReceiveState) => state?.channel
);