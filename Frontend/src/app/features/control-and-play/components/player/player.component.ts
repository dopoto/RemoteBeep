import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    combineLatest,
    distinctUntilChanged,
    filter,
    map,
    Observable,
    Subject,
    takeUntil,
} from 'rxjs';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { PlayService } from 'src/app/core/services/play/play.service';
import { AppState } from 'src/app/core/store/app.state';
import {
    selectIsPlaying,
    selectMode,
    selector,
} from 'src/app/core/store/selectors/play-sound.selectors';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
    ngDestroyed$ = new Subject();

    mode$: Observable<PlaySoundsMode> | undefined;
    modeEnum = PlaySoundsMode;

    isPlaying$: Observable<boolean> | undefined;

    freqInKhz$: Observable<number> | undefined;
    durationInSeconds$: Observable<number> | undefined;

    constructor(
        private readonly store: Store<AppState>,
        private playService: PlayService
    ) {
        this.isPlaying$ = this.store.pipe(select(selectIsPlaying));
        this.mode$ = this.store.pipe(select(selectMode));
        this.freqInKhz$ = this.store
            .pipe(select(selector))
            .pipe(map((res) => res.freqInKhz));
        this.durationInSeconds$ = this.store
            .pipe(select(selector))
            .pipe(map((res) => res.durationInSeconds));

        const observables = {
            isPlaying: this.isPlaying$.pipe(
                filter((isPlaying) => isPlaying === true)
            ),
            mode: this.mode$.pipe(
                filter(
                    (mode) =>
                        mode === PlaySoundsMode.PlayOnly ||
                        mode === PlaySoundsMode.ControlAndPlay
                )
            ),
            freqInKhz: this.freqInKhz$,
            durationInSeconds: this.durationInSeconds$,
        };
        const combined = combineLatest(observables).pipe(
            distinctUntilChanged(),
            takeUntil(this.ngDestroyed$)
        );

        combined.subscribe((res) => {
            console.log("PLAYING " + JSON.stringify(res));
            this.playService.playBeep(res.freqInKhz, res.durationInSeconds);
        });
    }

    ngOnDestroy() {
        this.ngDestroyed$.next(null);
    }
}
