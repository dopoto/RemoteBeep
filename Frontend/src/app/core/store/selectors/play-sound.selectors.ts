import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PlaySoundsState } from '../../models/play-sounds-state';

export const selector = createFeatureSelector<PlaySoundsState>('playSounds');

export const selectMode = createSelector(
    selector,
    (state: PlaySoundsState) => state?.mode
);

export const selectIsPlaying = createSelector(
    selector,
    (state: PlaySoundsState) => state?.isPlaying
);
