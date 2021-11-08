import { PlaySoundsState } from "../models/play-sounds-state";
import * as actions from '../actions/play-sounds.actions';
import { initialPlaySoundsState, playSoundsReducer } from "./play-sounds.reducers";
import { PlaySoundsMode } from "src/app/core/models/play-sounds-mode";
import { BeepCommand } from "src/app/core/models/beep-command";

describe('PlaySoundsReducer', () => {
    describe('on an unknown action', () => {
        it('should not update the state', () => {
            const initialState = initialPlaySoundsState;
            const action = {
                type: 'Unknown',
              };
            const state = playSoundsReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('on playOk action', () => {
        it('should update the state in an immutable way using the passed beep command', () => {
            const initialState = initialPlaySoundsState;
            const expectedNewState: PlaySoundsState = {
                isPlaying: true,
                mode: PlaySoundsMode.ControlAndPlay,
                freqInKhz: 62,
                durationInSeconds: 43,
            }
            const beepCommand: BeepCommand = {
                freqInKhz: 62, durationInSeconds: 43
            } ;
            const action = actions.playOk({ beepCommand });
            const state = playSoundsReducer(initialState, action);

            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    describe('on stopOk action', () => {
        it('should update the state in an immutable way', () => {
            const initialState = initialPlaySoundsState;
            const expectedNewState: PlaySoundsState = {
                isPlaying: false,
                mode: initialState.mode,
                freqInKhz: initialState.freqInKhz,
                durationInSeconds: initialState.durationInSeconds
            }
            const action = actions.stopOk();
            const state = playSoundsReducer(initialState, action);

            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    describe('on changePlayMode action', () => {
        it('should update the state in an immutable way using the passed mode', () => {
            const initialState = initialPlaySoundsState;
            const expectedNewState: PlaySoundsState = {
                isPlaying: initialState.isPlaying,
                mode: PlaySoundsMode.PlayOnly,
                freqInKhz: initialState.freqInKhz,
                durationInSeconds: initialState.durationInSeconds
            }
            const action = actions.changePlayMode({newPlayMode: PlaySoundsMode.PlayOnly});
            const state = playSoundsReducer(initialState, action);

            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    describe('on changeFreq action', () => {
        it('should update the state in an immutable way using the passed mode', () => {
            const initialState = initialPlaySoundsState;
            const expectedNewState: PlaySoundsState = {
                isPlaying: initialState.isPlaying,
                mode: initialState.mode,
                freqInKhz: 1232,
                durationInSeconds: initialState.durationInSeconds
            }
            const action = actions.changeFreq({newFreqInKhz: 1232});
            const state = playSoundsReducer(initialState, action);

            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    describe('on changeDuration action', () => {
        it('should update the state in an immutable way using the passed duration', () => {
            const initialState = initialPlaySoundsState;
            const expectedNewState: PlaySoundsState = {
                isPlaying: initialState.isPlaying,
                mode: initialState.mode,
                freqInKhz: initialState.freqInKhz,
                durationInSeconds: 77
            }
            const action = actions.changeDuration({newDurationInSeconds: 77});
            const state = playSoundsReducer(initialState, action);

            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });
});
