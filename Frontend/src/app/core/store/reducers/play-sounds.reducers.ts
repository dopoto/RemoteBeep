import { Action, createReducer, on } from '@ngrx/store';
import { PlaySoundsMode } from '../../models/play-sounds-mode';

import { PlaySoundsState } from '../../models/play-sounds-state';
import * as actions from '../actions/play-sounds.actions';

export const initialPlaySoundsState: PlaySoundsState = {
    isPlaying: false,
    mode: PlaySoundsMode.ControlAndPlay,
    freqInKhz: 2,
    durationInSeconds: 3,
};

export const playSoundsReducer = createReducer(
    initialPlaySoundsState,

    on(actions.beginPlayOk, (state, { beepCommand }) => ({
        ...state,
        isPlaying: true,
        freqInKhz: beepCommand.freqInKhz,
        durationInSeconds: beepCommand.durationInSeconds,
    })),

    on(actions.stopPlayOk, (state) => ({
        ...state,
        isPlaying: false,
    })),

    on(actions.changePlayMode, (state, { newPlayMode }) => ({
        ...state,
        mode: newPlayMode,
    })),

    on(actions.changeFreq, (state, { newFreqInKhz }) => ({
        ...state,
        freqInKhz: newFreqInKhz,
    })),

    on(actions.changeDuration, (state, { newDurationInSeconds }) => ({
        ...state,
        durationInSeconds: newDurationInSeconds,
    }))
);