import { createAction, props } from '@ngrx/store';

import { BeepCommand } from '../../models/beep-command';
import { PlaySoundsMode } from '../../models/play-sounds-mode';
import { PlaySoundsActionTypes } from './_app-action-types';

const actions = PlaySoundsActionTypes;

export const beginPlayStart = createAction(
    actions.beginPlayStart,
    props<{ beepCommand: BeepCommand }>()
);
export const beginPlayOk = createAction(
    actions.beginPlayOk,
    props<{ beepCommand: BeepCommand }>()
);
export const beginPlayError = createAction(actions.beginPlayError);

export const stopPlayStart = createAction(actions.stopPlayStart);
export const stopPlayOk = createAction(actions.stopPlayOk);
export const stopPlayError = createAction(actions.stopPlayError);

export const changePlayMode = createAction(
    actions.changePlayMode,
    props<{ newPlayMode: PlaySoundsMode }>()
);

export const changeFreq = createAction(
    actions.changeFreq,
    props<{ newFreqInKhz: number }>()
);

export const changeDuration = createAction(
    actions.changeDuration,
    props<{ newDurationInSeconds: number }>()
);
