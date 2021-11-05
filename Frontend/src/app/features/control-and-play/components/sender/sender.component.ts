import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { changeFreq, changeDuration } from 'src/app/state/actions/play-sounds.actions';
import { sendBeepCommandStart } from 'src/app/state/actions/send-receive.actions';
import { selectMode, selectIsPlaying } from 'src/app/state/selectors/play-sound.selectors';
import { playSoundsSelector } from 'src/app/state/selectors/play-sound.selectors';

@Component({
    selector: 'app-sender',
    templateUrl: './sender.component.html',
    styleUrls: ['./sender.component.scss'],
})
export class SenderComponent implements OnInit {
    ngDestroyed$ = new Subject();

    mode$: Observable<PlaySoundsMode> | undefined;
    modeEnum = PlaySoundsMode;

    freqInKhz: number | undefined;
    durationInSeconds: number | undefined;

    isPlaying$: Observable<boolean> | undefined;

    constructor(private readonly store: Store) {
        this.mode$ = this.store.pipe(select(selectMode));
        this.isPlaying$ = this.store.pipe(select(selectIsPlaying));
        
        this.store.pipe(
            takeUntil(this.ngDestroyed$),
            select(playSoundsSelector),
        ).subscribe(res => {
            this.freqInKhz = res.freqInKhz;
            this.durationInSeconds = res.durationInSeconds;
        });
    }

    ngOnInit(): void {}

    play(): void {
        const beepCommand = {
            freqInKhz: this.freqInKhz,
            durationInSeconds:this.durationInSeconds,
        } as BeepCommand;
        this.store.dispatch(sendBeepCommandStart({ beepCommand }));
    }

    stop(): void {
        const beepCommand = {
            freqInKhz: 0,
            durationInSeconds:0
        } as BeepCommand;
        this.store.dispatch(sendBeepCommandStart({ beepCommand }));
    }

    changeFreq($event: any): void {
        this.store.dispatch(changeFreq({ newFreqInKhz: $event.value }));
    }

    changeDuration($event: any): void {
        this.store.dispatch(
            changeDuration({ newDurationInSeconds: $event.value })
        );
    }
    
    ngOnDestroy() {
        this.ngDestroyed$.next(null);
    }
}
