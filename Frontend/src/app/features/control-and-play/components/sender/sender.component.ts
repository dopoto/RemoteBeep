import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BeepCommand } from 'src/app/core/models/beep-command';
import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { sendBeepCommandStart } from 'src/app/core/store/actions/send-receive.actions';
import { AppState } from 'src/app/core/store/app.state';
import { selectIsPlaying, selectMode } from 'src/app/core/store/selectors/play-sound.selectors';

@Component({
    selector: 'app-sender',
    templateUrl: './sender.component.html',
    styleUrls: ['./sender.component.scss'],
})
export class SenderComponent implements OnInit {
    
    mode$: Observable<PlaySoundsMode> | undefined;
    modeEnum = PlaySoundsMode;
    
    khz: number = 3;
    seconds: number = 3;
    
    isPlaying$ : Observable<boolean> | undefined;
    
    constructor(private readonly store: Store<AppState>) {
        this.mode$ = this.store.pipe(select(selectMode));
        this.isPlaying$ = this.store.pipe(select(selectIsPlaying));
    }

    ngOnInit(): void {}

    play(): void {
        const beepCommand = {
            freqInKhz: this.khz,
            durationInSeconds: this.seconds
        } as BeepCommand;
        this.store.dispatch(sendBeepCommandStart({ beepCommand }));
    }

    stop(): void {}
}
