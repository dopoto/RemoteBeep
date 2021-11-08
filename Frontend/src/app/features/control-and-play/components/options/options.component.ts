import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { changePlayMode } from 'src/app/state/actions/play-sounds.actions';
import { selectMode } from 'src/app/state/selectors/play-sound.selectors';
import { ComponentType } from 'src/app/core/models/component-type';
import { expandPanel, collapsePanel } from 'src/app/state/actions/app-config.actions';
import { selectComponentState } from 'src/app/state/selectors/app-config.selectors';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

    mode$: Observable<PlaySoundsMode> | undefined;
    modeEnum = PlaySoundsMode;
    
    componentState$: Observable<{ isExpanded: boolean }> | undefined;

    constructor(private readonly store: Store) {}

    ngOnInit(): void {
        this.mode$ = this.store.pipe(select(selectMode));

        this.componentState$ = this.store.pipe(
            select(selectComponentState(ComponentType.PlayMode))
        );
    }

    onModeChange($event: {value: PlaySoundsMode}) {        
        this.store.dispatch(changePlayMode({ newPlayMode: $event.value }));
    }
    
    expand(): void {
        this.store.dispatch(expandPanel({ componentType: ComponentType.PlayMode }));
    }

    collapse(): void {
        this.store.dispatch(collapsePanel({ componentType: ComponentType.PlayMode }));
    }
}
