import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, map, mergeMap, tap, withLatestFrom } from 'rxjs';

import { LogService } from '../../services/log/log.service';
import { routerNavigatedAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { selectRouteParam } from '../selectors/router.selectors';
import * as actions from '../actions/send-receive.actions';

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
            // withLatestFrom(
            //     this.store.pipe(select(selectRouteParam('channel')))
            // ),
            concatLatestFrom(() =>
                this.store.select(selectRouteParam('channel'))
            ),
            map(([, routeChannel]) => {
                const channel = routeChannel ?? '';
                this.logService.info("NEW CHANNEL: " + channel);
                return actions.changeChannel({channel});
            })
            // mergeMap(([, routeChannel]) => {
            //     const channel = routeChannel ?? '';
            //     this.logService.info("NEW CHANNEL: " + channel);

            //     // TODO Revisit
            //     return from(EMPTY).pipe(
            //         map(() => {
            //             this.logService.info("CALL CHANGE CHANNEL: " + channel);
            //             return actions.changeChannel({ channel });
            //         })
            //     );
            // })
        ),
        { dispatch: true }
    );
}
