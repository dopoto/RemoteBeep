import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AppConfigEffects } from './app-config.effects';
import { AppState } from '../app.state';
import * as actions from '../actions/app-config.actions';
import { ComponentType } from 'src/app/core/models/component-type';

describe('AppConfigEffects', () => {
    let actions$ = new Observable<Action>();
    let effects: AppConfigEffects;
    const initialState = {} as AppState;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AppConfigEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
            ],
        });

        actions$ = TestBed.inject(Actions);
        effects = TestBed.inject(AppConfigEffects);
    });

    describe('initOk', () => {
        it('should dispatch the emitNotification action', (done) => {
            actions$ = of(actions.initOk);
            effects.initOk$.subscribe((res) => {
                expect(res).toEqual(
                    actions.emitNotification({ appNotification: {
                        text: 'Connected to server.',
                        type: 'info',
                    } })
                );
                done();
            });
        });
    });
    
    describe('expandPanel', () => {
        it('should dispatch the updateComponentUiStates action', (done) => {
            actions$ = of(actions.expandPanel({ componentType: ComponentType.PlayMode}));
            effects.expandPanel$.subscribe((res) => {
                expect(res.componentUiStates.PlayMode.isExpanded).toBeTrue();
                done();
            });
        });
    });
        
    describe('collapsePanel', () => {
        it('should dispatch the updateComponentUiStates action', (done) => {
            actions$ = of(actions.collapsePanel({ componentType: ComponentType.PlayMode}));
            effects.collapsePanel$.subscribe((res) => {
                expect(res.componentUiStates.PlayMode.isExpanded).toBeFalse();
                done();
            });
        });
    });
});
