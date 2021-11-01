import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { changePlayMode } from 'src/app/core/store/actions/play-sounds.actions';
import { AppState } from 'src/app/core/store/app.state';
import { selectMode } from 'src/app/core/store/selectors/play-sound.selectors';

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
