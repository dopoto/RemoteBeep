import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MetaState } from '../../models/meta-state';

export const selector = createFeatureSelector<MetaState>('meta');

export const selectLastNotification = createSelector(
    selector,
    (state: MetaState) => state?.lastNotification
);