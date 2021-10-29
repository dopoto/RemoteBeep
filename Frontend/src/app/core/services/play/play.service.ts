import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';

@Injectable({
    providedIn: 'root',
})
export class PlayService {
    oscillator: any;

    constructor(
        private logService: LogService
    ) {}

    playBeep(freqInKhz: number, durationInSeconds: number) {
        var audioCtx = new ((<any>window).AudioContext ||
            (<any>window).webkitAudioContext)();

        this.oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();

        this.oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        gainNode.gain.value = 1;
        this.oscillator.frequency.value = freqInKhz * 1000;
        this.oscillator.type = 'sine';

        this.oscillator.start();

        setTimeout(() => {
            this.oscillator.stop();
            this.logService.info(
                `Stopped ${freqInKhz} khz / ${durationInSeconds} seconds.`
            );
        }, durationInSeconds * 1000);
    }
}
