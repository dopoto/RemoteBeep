import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { changePlayMode } from 'src/app/state/actions/play-sounds.actions';
import { selectMode } from 'src/app/state/selectors/play-sound.selectors';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

    mode$: Observable<PlaySoundsMode> | undefined;
    modeEnum = PlaySoundsMode;
    
    constructor(private readonly store: Store) {}

    ngOnInit(): void {
        this.mode$ = this.store.pipe(select(selectMode));
    }

    onModeChange($event: {value: PlaySoundsMode}) {        
        this.store.dispatch(changePlayMode({ newPlayMode: $event.value }));
    }
}
