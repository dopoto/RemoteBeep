import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, Observable, Subject, takeUntil } from 'rxjs';
import { ComponentType } from 'src/app/core/models/component-type';

import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { PlayService } from 'src/app/core/services/play/play.service';
import { collapsePanel, expandPanel } from 'src/app/state/actions/app-config.actions';
import { AppState } from 'src/app/state/app.state';
import { selectComponentState } from 'src/app/state/selectors/app-config.selectors';
import {
    playSoundsSelector,
    selectIsPlaying,
    selectMode,
} from 'src/app/state/selectors/play-sound.selectors';

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

    componentState$: Observable<{ isExpanded: boolean }> | undefined;

    freqInKhz: number = 0;
    durationInSeconds: number = 0;

    constructor(
        private readonly store: Store<AppState>,
        private playService: PlayService
    ) {
        this.isPlaying$ = this.store.pipe(select(selectIsPlaying));
        this.mode$ = this.store.pipe(select(selectMode));

        this.componentState$ = this.store.pipe(
            select(selectComponentState(ComponentType.SoundPlayer))
        );
        
        this.store
            .pipe(takeUntil(this.ngDestroyed$), select(playSoundsSelector))
            .subscribe((res) => {
                this.freqInKhz = res.freqInKhz;
                this.durationInSeconds = res.durationInSeconds;
            });

        //TODO Refactor - extract common logic to a function:
            
        const playOrStop = {
            isPlaying: this.isPlaying$,
            mode: this.mode$,
        };

        // Handle play requests:
        const playChanges$ = combineLatest(playOrStop).pipe(
            takeUntil(this.ngDestroyed$),
            filter((playChanges) => playChanges.isPlaying === true),
            filter(
                (playChanges) =>
                    playChanges.mode === PlaySoundsMode.PlayOnly ||
                    playChanges.mode === PlaySoundsMode.ControlAndPlay
            )
        );
        playChanges$.subscribe(() => {
            this.playService.playBeep(this.freqInKhz, this.durationInSeconds);
        });

        // Handle stop requests:
        const stopChanges$ = combineLatest(playOrStop).pipe(
            takeUntil(this.ngDestroyed$),
            filter((playChanges) => playChanges.isPlaying === false),
            filter(
                (playChanges) =>
                    playChanges.mode === PlaySoundsMode.PlayOnly ||
                    playChanges.mode === PlaySoundsMode.ControlAndPlay
            )
        );
        stopChanges$.subscribe(() => {
            this.playService.stop(0);
        });
    }

    expand(): void {
        this.store.dispatch(expandPanel({ componentType: ComponentType.SoundPlayer }));
    }

    collapse(): void {
        this.store.dispatch(collapsePanel({ componentType: ComponentType.SoundPlayer }));
    }
    
    ngOnDestroy() {
        this.ngDestroyed$.next(null);
    }
}
