import { Action, createReducer, on } from '@ngrx/store';
import { PlaySoundsMode } from '../../models/play-sounds-mode';

import { PlaySoundsState } from '../../models/play-sounds-state';
import * as actions from '../actions/play-sounds.actions';

export const initialState: PlaySoundsState = {
    isPlaying: false,
    mode: PlaySoundsMode.ControlAndPlay,
    freqInKhz: 0,
    durationInSeconds: 0,
};

const playSoundsReducer = createReducer(
    initialState,

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

    on(actions.changePlayModeStart, (state, { newPlayMode }) => ({
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

export function reducer(state: PlaySoundsState | undefined, action: Action) {
    return playSoundsReducer(state, action);
}
