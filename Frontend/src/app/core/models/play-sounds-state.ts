import { PlaySoundsMode } from "./play-sounds-mode";

export interface PlaySoundsState {
    mode: PlaySoundsMode;
    isPlaying: boolean;
    freqInKhz: number;
    durationInSeconds: number;
}