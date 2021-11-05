import { createAction, props } from '@ngrx/store';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { PlaySoundsActionTypes } from './_app-action-types';

const actionTypes = PlaySoundsActionTypes;

export const requestPlay = createAction(
    actionTypes.requestPlay,
    props<{ beepCommand: BeepCommand }>()
);
export const playOk = createAction(
    actionTypes.playOk,
    props<{ beepCommand: BeepCommand }>()
);
export const playError = createAction(actionTypes.playError);

export const requestStop = createAction(actionTypes.requestStop);
export const stopOk = createAction(actionTypes.stopOk);
export const stopError = createAction(actionTypes.stopError);

export const changePlayMode = createAction(
    actionTypes.changePlayMode,
    props<{ newPlayMode: PlaySoundsMode }>()
);

export const changeFreq = createAction(
    actionTypes.changeFreq,
    props<{ newFreqInKhz: number }>()
);

export const changeDuration = createAction(
    actionTypes.changeDuration,
    props<{ newDurationInSeconds: number }>()
);
