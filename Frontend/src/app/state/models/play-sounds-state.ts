import { PlaySoundsMode } from "src/app/core/models/play-sounds-mode";

export interface PlaySoundsState {
    mode: PlaySoundsMode;
    isPlaying: boolean;
    freqInKhz: number;
    durationInSeconds: number;
}