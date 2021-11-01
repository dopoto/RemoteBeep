import { createAction, props } from '@ngrx/store';

import { BeepCommand } from '../../models/beep-command';
import { PlaySoundsMode } from '../../models/play-sounds-mode';
import { PlaySoundsActionTypes } from './_app-action-types';

const actionTypes = PlaySoundsActionTypes;

export const beginPlayStart = createAction(
    actionTypes.beginPlayStart,
    props<{ beepCommand: BeepCommand }>()
);
export const beginPlayOk = createAction(
    actionTypes.beginPlayOk,
    props<{ beepCommand: BeepCommand }>()
);
export const beginPlayError = createAction(actionTypes.beginPlayError);

export const stopPlayStart = createAction(actionTypes.stopPlayStart);
export const stopPlayOk = createAction(actionTypes.stopPlayOk);
export const stopPlayError = createAction(actionTypes.stopPlayError);

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
