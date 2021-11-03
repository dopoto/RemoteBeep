import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppConfigState } from '../models/app-config-state';

export const appConfigSelector = createFeatureSelector<AppConfigState>('appConfig');

export const selectLastNotification = createSelector(
    appConfigSelector,
    (state: AppConfigState) => state?.lastNotification
);

export const selectIsLoading = createSelector(
    appConfigSelector,
    (state: AppConfigState) => state?.isLoading
);