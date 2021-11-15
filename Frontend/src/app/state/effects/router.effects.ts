import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';

import { selectRouteGroupAndStoredGroup } from '../selectors/router.selectors';
import * as actions from '../actions/send-receive.actions';
import { LogService } from 'src/app/core/services/log/log.service';

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router,
        private logService: LogService,
    ) {}

    updateGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            concatLatestFrom(() =>
                this.store.select(selectRouteGroupAndStoredGroup)
            ),
            map(([, groupData]) => {
                let group = '';
                if(groupData.routeGroup){
                    group = groupData.routeGroup;
                    this.logService.info("[REFFE] Route group found: " + group);
                }                
                else if(groupData.storedGroup)
                {
                    group = groupData.storedGroup;
                    this.logService.info("[REFFE] Stored group found: " + group);
                }          
                this.router.navigate(['/home', {group}]);  
                return actions.changeGroup({group});
            })
        ),
        { dispatch: true }
    );
}
