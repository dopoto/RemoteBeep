import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SendReceiveState } from '../models/send-receive-state';

export const selector = createFeatureSelector<SendReceiveState>('sendReceive');

export const selectChannel = createSelector(
    selector,
    (state: SendReceiveState) => state?.channel
);