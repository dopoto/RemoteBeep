import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ComponentType } from 'src/app/core/models/component-type';

import { AppConfigState } from '../models/app-config-state';

export const appConfigSelector =
    createFeatureSelector<AppConfigState>('appConfig');

export const selectLastNotification = createSelector(
    appConfigSelector,
    (state: AppConfigState) => state?.lastNotification
);

export const selectIsLoading = createSelector(
    appConfigSelector,
    (state: AppConfigState) => state?.isLoading
);

export const selectComponentUiStates = createSelector(
    appConfigSelector,
    (state: AppConfigState) => state?.componentUiStates
);

export const selectComponentState = (panelType: ComponentType) =>
    createSelector(appConfigSelector, (state) => state.componentUiStates[panelType]);
