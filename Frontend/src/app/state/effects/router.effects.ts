import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';

import { selectRouteChannelAndStoredChannel } from '../selectors/router.selectors';
import * as actions from '../actions/send-receive.actions';
import { LogService } from 'src/app/core/services/log/log.service';
import { Router } from '@angular/router';

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router,
        private logService: LogService,
    ) {}

    updateChannel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            concatLatestFrom(() =>
                this.store.select(selectRouteChannelAndStoredChannel)
            ),
            map(([, channelData]) => {
                let channel = '';
                if(channelData.routeChannel){
                    channel = channelData.routeChannel;
                    this.logService.info("[REFFE] Route channel found: " + channel);
                }                
                else if(channelData.storedChannel)
                {
                    channel = channelData.storedChannel;
                    this.logService.info("[REFFE] Stored channel found: " + channel);
                }          
                this.router.navigate(['/home', {channel}]);  
                return actions.changeChannel({channel});
            })
        ),
        { dispatch: true }
    );
}
