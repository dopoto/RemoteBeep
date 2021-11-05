import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PanelType } from 'src/app/core/models/panel-type';

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

export const selectPanelStates = createSelector(
    appConfigSelector,
    (state: AppConfigState) => state?.panelStates
);

export const selectComponentState = (panelType: PanelType) =>
    createSelector(appConfigSelector, (state) => state.panelStates[panelType]);
