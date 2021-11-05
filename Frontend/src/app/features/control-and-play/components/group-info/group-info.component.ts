import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { AppNotification } from 'src/app/core/models/app-notification';
import { PanelType } from 'src/app/core/models/panel-type';
import {
    collapsePanel,
    emitNotification,
    expandPanel,
} from 'src/app/state/actions/app-config.actions';
import { selectComponentState } from 'src/app/state/selectors/app-config.selectors';

import {
    selectGroup,
    selectOtherDevicesCount,
} from 'src/app/state/selectors/send-receive.selectors';

@Component({
    selector: 'app-group-info',
    templateUrl: './group-info.component.html',
    styleUrls: ['./group-info.component.scss'],
})
export class GroupInfoComponent {
    groupUrl$: Observable<string> | undefined;
    otherDevicesMessage$: Observable<string> | undefined;
    componentState$: Observable<{ isExpanded: boolean }> | undefined;

    constructor(private readonly store: Store) {
        this.componentState$ = this.store.pipe(
            select(selectComponentState(PanelType.GroupInfo))
        );

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

    expand(): void {
        this.store.dispatch(expandPanel({ panel: PanelType.GroupInfo }));
    }

    collapse(): void {
        this.store.dispatch(collapsePanel({ panel: PanelType.GroupInfo }));
    }
}
