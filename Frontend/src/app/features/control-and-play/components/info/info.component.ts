import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { AppNotification } from 'src/app/core/models/app-notification';
import { emitNotification } from 'src/app/state/actions/app-config.actions';

import {
    selectGroup,
    selectOtherDevicesCount,
} from 'src/app/state/selectors/send-receive.selectors';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
    groupUrl$: Observable<string> | undefined;
    otherDevicesMessage$: Observable<string> | undefined;

    constructor(private readonly store: Store) {
        this.groupUrl$ = this.store.pipe(
            select(selectGroup),
            map((group) => `${location.origin}#/home;group=${group}`)
        );

        this.otherDevicesMessage$ = this.store.pipe(
            select(selectOtherDevicesCount),
            filter((_) => _ !== undefined),
            map((count) => {
                return count === 0
                    ? `You are the only one in this group at the moment.`
                    : count === 1
                    ? `There is 1 other device in this group.`
                    : `There are ${count} other devices in this group.`;
            })
        );
    }

    copyToClipboard(value: string): string {
        return `${value}`;
    }

    confirmCopyToClipboard(): void {
        const appNotification: AppNotification = {
            text: 'RemoteBeep address copied to clipboard',
            type: 'info',
        };
        this.store.dispatch(emitNotification({ appNotification }));
    }
}
