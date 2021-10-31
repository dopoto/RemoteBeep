import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppConfigState } from '../../models/app-config-state';

export const selector = createFeatureSelector<AppConfigState>('meta');

export const selectLastNotification = createSelector(
    selector,
    (state: AppConfigState) => state?.lastNotification
);