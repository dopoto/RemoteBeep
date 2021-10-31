import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';

@Injectable({
    providedIn: 'root',
})
export class PlayService {
    oscillator: any;
    isPlaying = false;

    constructor(private logService: LogService) {}

    playBeep(freqInKhz: number, durationInSeconds: number) {
        if (!this.isPlaying) {
            this.init(freqInKhz);
            this.stop(durationInSeconds);
        }
    }

    init(freqInKhz: number): void {
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
        this.logService.info(`Started`);

        this.oscillator.onended = () => {
            this.logService.info(`on ended `);
            this.isPlaying = false;
        };
    }

    stop(delayInSeconds: number) {
        setTimeout(() => {
            this.oscillator.stop();
            this.logService.info(`Stopped after ${delayInSeconds} seconds.`);
        }, delayInSeconds * 1000);
    }
}
