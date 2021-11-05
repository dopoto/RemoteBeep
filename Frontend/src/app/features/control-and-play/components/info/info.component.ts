import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppNotification } from 'src/app/core/models/app-notification';
import { emitNotification } from 'src/app/state/actions/app-config.actions';

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

    copyToClipboard(value: string): string {
        return `${value}`;
    }

    confirmCopyToClipboard(): void {
        const appNotification: AppNotification = {
            text: 'RemoteBeep address copied to clipboard',
            type: 'info'
        }
        this.store.dispatch(emitNotification({appNotification}));
    }
}
