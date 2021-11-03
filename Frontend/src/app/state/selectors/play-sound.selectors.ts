import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PlaySoundsState } from '../models/play-sounds-state';

export const playSoundsSelector = createFeatureSelector<PlaySoundsState>('playSounds');

export const selectMode = createSelector(
    playSoundsSelector,
    (state: PlaySoundsState) => state?.mode
);

export const selectIsPlaying = createSelector(
    playSoundsSelector,
    (state: PlaySoundsState) => state?.isPlaying
);
