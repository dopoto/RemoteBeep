import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    combineLatest,
    distinctUntilChanged,
    filter,
    forkJoin,
    map,
    merge,
    Observable,
    of,
    Subject,
    takeUntil,
    tap,
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

    freqInKhz: number = 0;
    durationInSeconds: number = 0;

    constructor(
        private readonly store: Store<AppState>,
        private playService: PlayService
    ) {
        this.isPlaying$ = this.store.pipe(select(selectIsPlaying));
        this.mode$ = this.store.pipe(select(selectMode));

        this.store
            .pipe(takeUntil(this.ngDestroyed$), select(selector))
            .subscribe((res) => {
                this.freqInKhz = res.freqInKhz;
                this.durationInSeconds = res.durationInSeconds;
            });

        const playChanges$ = {
            isPlaying: this.isPlaying$?.pipe(
                filter((isPlaying) => isPlaying === true)
            ),
            mode: this.mode$?.pipe(
                filter(
                    (mode) =>
                        mode === PlaySoundsMode.PlayOnly ||
                        mode === PlaySoundsMode.ControlAndPlay
                )
            ),
        };
        combineLatest(playChanges$)
            .pipe(takeUntil(this.ngDestroyed$), distinctUntilChanged())
            .subscribe(() => {
                console.log(
                    `PLAYING ${this.freqInKhz} khz for ${this.durationInSeconds} seconds`
                );
                this.playService.playBeep(
                    this.freqInKhz,
                    this.durationInSeconds
                );
            });
    }

    ngOnDestroy() {
        this.ngDestroyed$.next(null);
    }
}
