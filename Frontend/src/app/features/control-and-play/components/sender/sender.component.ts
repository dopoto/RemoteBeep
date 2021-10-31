import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import {
    changeDurationStart,
    changeFreqStart,
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
    mode$: Observable<PlaySoundsMode> | undefined;
    modeEnum = PlaySoundsMode;

    freqInKhz$: Observable<number> | undefined;
    durationInSeconds$: Observable<number> | undefined;

    isPlaying$: Observable<boolean> | undefined;

    constructor(private readonly store: Store<AppState>) {
        this.mode$ = this.store.pipe(select(selectMode));
        this.isPlaying$ = this.store.pipe(select(selectIsPlaying));
        this.freqInKhz$ = this.store
            .pipe(select(selector))
            .pipe(map((res) => res.freqInKhz));
        this.durationInSeconds$ = this.store
            .pipe(select(selector))
            .pipe(map((res) => res.durationInSeconds));
    }

    ngOnInit(): void {}

    play(): void {
        const beepCommand = {
            freqInKhz: 10,
            durationInSeconds: 11,
        } as BeepCommand;
        this.store.dispatch(sendBeepCommandStart({ beepCommand }));
    }

    stop(): void {}

    changeFreq($event: any): void {
        debugger;
        this.store.dispatch(changeFreqStart({ newFreqInKhz: $event.value }));
    }

    changeDuration($event: any): void {
        debugger;
        this.store.dispatch(
            changeDurationStart({ newDurationInSeconds: $event.value })
        );
    }
}
