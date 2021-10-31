import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import {
    changeDuration,
    changeFreq,
} from 'src/app/core/store/actions/play-sounds.actions';
import { sendBeepCommandStart } from 'src/app/core/store/actions/send-receive.actions';
import { AppState } from 'src/app/core/store/app.state';
import {
    selectIsPlaying,
    selectMode,
    selector,
} from 'src/app/core/store/selectors/play-sound.selectors';

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

    constructor(private readonly store: Store<AppState>) {
        this.mode$ = this.store.pipe(select(selectMode));
        this.isPlaying$ = this.store.pipe(select(selectIsPlaying));
        
        this.store.pipe(
            takeUntil(this.ngDestroyed$),
            select(selector),
        ).subscribe(res => {
            this.freqInKhz = res.freqInKhz
            this.durationInSeconds = res.durationInSeconds
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

    stop(): void {}

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
