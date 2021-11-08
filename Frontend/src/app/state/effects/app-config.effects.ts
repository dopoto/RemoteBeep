import { Injectable } from '@angular/core';
import { combineLatest, map, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as actions from '../actions/app-config.actions';
import { emitNotification } from '../actions/app-config.actions';
import { AppNotification } from 'src/app/core/models/app-notification';
import { LogService } from 'src/app/core/services/log/log.service';
import { selectComponentUiStates } from '../selectors/app-config.selectors';
import { ComponentType } from 'src/app/core/models/component-type';
import { ComponentUiState } from 'src/app/core/models/component-ui-state';

@Injectable()
export class AppConfigEffects {
    constructor(
        private actions$: Actions,
        private logService: LogService,
        private readonly store: Store
    ) {}

    initStart$ = createEffect(
        () => this.actions$.pipe(ofType(actions.initStart)),
        { dispatch: false }
    );

    initOk$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.initOk),
                tap(() => {
                    const appNotification: AppNotification = {
                        text: 'Connected to server.',
                        type: 'info',
                    };
                    this.store.dispatch(emitNotification({ appNotification }));
                })
            ),
        {
            dispatch: false,
        }
    );

    // TODO keep?
    initError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.initError),
                tap(() => {
                    const appNotification: AppNotification = {
                        text: 'Could not connect to server.',
                        type: 'error',
                    };
                    this.store.dispatch(emitNotification({ appNotification }));
                })
            ),
        { dispatch: false }
    );

    expandPanel$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.expandPanel),
                withLatestFrom(this.store.select(selectComponentUiStates)),
                tap(([componentType, componentUiStates]) => {
                    this.togglePanel(componentUiStates, componentType, true);
                })
            ),
        {
            dispatch: false,
        }
    );

    collapsePanel$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.collapsePanel),
                withLatestFrom(this.store.select(selectComponentUiStates)),
                tap(([componentType, componentUiStates]) => {
                    this.togglePanel(componentUiStates, componentType, false);
                })
            ),
        {
            dispatch: false,
        }
    );

    emitNotification$ = createEffect(
        () => this.actions$.pipe(ofType(actions.emitNotification)),
        { dispatch: false }
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
        this.store.dispatch(
            actions.updateComponentUiStates({
                componentUiStates: newComponentUiStates,
            })
        );
    }
}
