import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { AppState } from 'src/app/core/store/app.state';
import { selectIsPlaying, selectMode, selector } from 'src/app/core/store/selectors/play-sound.selectors';

@Component({
    selector: 'app-watcher',
    templateUrl: './watcher.component.html',
    styleUrls: ['./watcher.component.scss'],
})
export class WatcherComponent {

    mode$: Observable<PlaySoundsMode> | undefined;
    modeEnum = PlaySoundsMode;

    isPlaying$ : Observable<boolean> | undefined;

    freqInKhz$ : Observable<number> | undefined;
    durationInSeconds$ : Observable<number> | undefined;

    currentCommand: BeepCommand = {
        durationInSeconds: 2,
        freqInKhz: 3,
    };
    
    constructor(private readonly store: Store<AppState>) {
        this.isPlaying$ = this.store.pipe(select(selectIsPlaying));
        this.mode$ = this.store.pipe(select(selectMode));
        this.freqInKhz$ = this.store.pipe(select(selector)).pipe(map(res => res.freqInKhz));
        this.durationInSeconds$ = this.store.pipe(select(selector)).pipe(map(res => res.durationInSeconds));
    }
}
