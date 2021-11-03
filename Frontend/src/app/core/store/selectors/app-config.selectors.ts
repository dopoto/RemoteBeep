import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getSelectors } from '@ngrx/router-store';

import { AppConfigState } from '../../models/app-config-state';

export const selector = createFeatureSelector<AppConfigState>('appConfig');

export const selectLastNotification = createSelector(
    selector,
    (state: AppConfigState) => state?.lastNotification
);

export const selectIsLoading = createSelector(
    selector,
    (state: AppConfigState) => state?.isLoading
);