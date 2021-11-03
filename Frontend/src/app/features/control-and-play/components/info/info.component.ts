import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { selectChannel } from 'src/app/state/selectors/send-receive.selectors';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
    channelUrl$: Observable<string> | undefined;

    constructor(private readonly store: Store) {
        this.channelUrl$ = this.store.pipe(
            select(selectChannel),
            map((channel) => `${location.origin}#/home;channel=${channel}`)
        );
    }
}
