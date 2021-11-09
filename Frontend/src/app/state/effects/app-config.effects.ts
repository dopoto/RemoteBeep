import { Injectable } from '@angular/core';
import { map, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as actions from '../actions/app-config.actions';
import { LogService } from 'src/app/core/services/log/log.service';
import { selectComponentUiStates } from '../selectors/app-config.selectors';
import { ComponentType } from 'src/app/core/models/component-type';
import { ComponentUiState } from 'src/app/core/models/component-ui-state';
import { AppConfigActionTypes } from '../actions/_app-action-types';

@Injectable()
export class AppConfigEffects {
    constructor(
        private actions$: Actions,
        private logService: LogService,
        private readonly store: Store
    ) {}

    initOk$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.initOk),
            map(() => {
                return {
                    type: AppConfigActionTypes.emitNotification,
                    appNotification: {
                        text: 'Connected to server.',
                        type: 'info',
                    },
                };
            })
        )
    );

    expandPanel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.expandPanel),
            withLatestFrom(this.store.select(selectComponentUiStates)),
            map(([componentType, componentUiStates]) =>
                this.togglePanel(componentUiStates, componentType, true)
            )
        )
    );

    collapsePanel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.collapsePanel),
            withLatestFrom(this.store.select(selectComponentUiStates)),
            map(([componentType, componentUiStates]) =>
                this.togglePanel(componentUiStates, componentType, false)
            )
        )
    );

    private togglePanel(
        componentUiStates: { [key in ComponentType]: ComponentUiState },
        panelData: { componentType: ComponentType },
        toggleTo: boolean
    ) {
        let newComponentUiStates = { ...componentUiStates };
        newComponentUiStates[panelData.componentType] = {
            ...newComponentUiStates[panelData.componentType],
            isExpanded: toggleTo,
        };
        return actions.updateComponentUiStates({
            componentUiStates: newComponentUiStates,
        });
    }
}
