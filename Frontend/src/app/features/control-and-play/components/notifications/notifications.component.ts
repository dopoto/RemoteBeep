import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import {
    Observable,
    Subject,
    takeUntil,
} from 'rxjs';
import { AppNotification } from 'src/app/core/models/app-notification';
import { selectLastNotification } from 'src/app/core/store/selectors/meta.selectors';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
    ngDestroyed$ = new Subject();
    appNotification$: Observable<AppNotification | undefined>;

    constructor(
        private readonly store: Store<AppState>,
        private snackBar: MatSnackBar
    ) {
        this.appNotification$ = this.store.pipe(select(selectLastNotification));
    }

    ngOnInit(): void {
        this.appNotification$
            .pipe(takeUntil(this.ngDestroyed$))
            .subscribe((res) => {
                if (res) {
                    // TODO show as error
                    // TODO use dismissible pop up instead of snackbar
                    this.snackBar.open(res.text, '', { duration: 5000 });
                }
            });
    }

    ngOnDestroy() {
        this.ngDestroyed$.next(null);
    }
}
