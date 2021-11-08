import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { ComponentType } from 'src/app/core/models/component-type';
import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import {
    expandPanel,
    collapsePanel,
} from 'src/app/state/actions/app-config.actions';
import {
    changeFreq,
    changeDuration,
} from 'src/app/state/actions/play-sounds.actions';
import {
    sendBeepCommandStart,
    sendStopCommand,
} from 'src/app/state/actions/send-receive.actions';
import { selectComponentState } from 'src/app/state/selectors/app-config.selectors';
import {
    selectMode,
    selectIsPlaying,
} from 'src/app/state/selectors/play-sound.selectors';
import { playSoundsSelector } from 'src/app/state/selectors/play-sound.selectors';

@Component({
    selector: 'app-sender',
    templateUrl: './sender.component.html',
    styleUrls: ['./sender.component.scss'],
})
export class SenderComponent implements OnInit {
    ngDestroyed$ = new Subject();

    freqInKhzFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(0),
        Validators.max(25),
    ]);
    
    durationInSecondsFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(0),
        Validators.max(60),
    ]);

    mode$: Observable<PlaySoundsMode> | undefined;
    modeEnum = PlaySoundsMode;

    freqInKhz: number | undefined;
    durationInSeconds: number | undefined;

    isPlaying$: Observable<boolean> | undefined;

    componentState$: Observable<{ isExpanded: boolean }> | undefined;

    constructor(private readonly store: Store) {
        this.mode$ = this.store.pipe(select(selectMode));
        this.isPlaying$ = this.store.pipe(select(selectIsPlaying));

        this.componentState$ = this.store.pipe(
            select(selectComponentState(ComponentType.Control))
        );

        this.store
            .pipe(takeUntil(this.ngDestroyed$), select(playSoundsSelector))
            .subscribe((res) => {
                this.freqInKhz = res.freqInKhz;
                this.durationInSeconds = res.durationInSeconds;
            });
    }

    ngOnInit(): void {}

    play(): void {
        const beepCommand = {
            freqInKhz: this.freqInKhz,
            durationInSeconds: this.durationInSeconds,
        } as BeepCommand;
        this.store.dispatch(sendBeepCommandStart({ beepCommand }));
    }

    stop(): void {
        this.store.dispatch(sendStopCommand());
    }

    validateFreq($event: Event): void {
        const val = ($event.target as any).value;
        if(this.freqInKhzFormControl.valid){
            this.store.dispatch(changeFreq({ newFreqInKhz: val }));
        }
    }

    validateDuration($event: Event): void {
        const val = ($event.target as any).value;
        if(this.durationInSecondsFormControl.valid){
            this.store.dispatch(changeDuration({ newDurationInSeconds: val }));
        }
    }

    changeFreq(value: any): void {
        this.store.dispatch(changeFreq({ newFreqInKhz: value }));
    }

    changeDuration($event: any): void {
        this.store.dispatch(
            changeDuration({ newDurationInSeconds: $event.value })
        );
    }

    expand(): void {
        this.store.dispatch(
            expandPanel({ componentType: ComponentType.Control })
        );
    }

    collapse(): void {
        this.store.dispatch(
            collapsePanel({ componentType: ComponentType.Control })
        );
    }

    isFreqInKhzInvalid(): boolean {
        return (
            this.freqInKhzFormControl.hasError('min') || 
            this.freqInKhzFormControl.hasError('max')  ||
            this.freqInKhzFormControl.hasError('pattern')
        ) && !this.freqInKhzFormControl.hasError('required');
    }

    isDurationInSecondsInvalid(): boolean {
        return (
            this.durationInSecondsFormControl.hasError('min') || 
            this.durationInSecondsFormControl.hasError('max')  ||
            this.durationInSecondsFormControl.hasError('pattern')
        ) && !this.durationInSecondsFormControl.hasError('required');
    }

    ngOnDestroy() {
        this.ngDestroyed$.next(null);
    }
}
