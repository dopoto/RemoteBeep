import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
 
import { selectRouteParam } from '../selectors/router.selectors';
import * as actions from '../actions/send-receive.actions';
import { LogService } from 'src/app/core/services/log/log.service';

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private logService: LogService,
        private store: Store
    ) {}

    updateChannel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            concatLatestFrom(() =>
                this.store.select(selectRouteParam('channel'))
            ),
            map(([, routeChannel]) => {
                const channel = routeChannel ?? '';
                return actions.changeChannel({channel});
            })
        ),
        { dispatch: true }
    );
}
