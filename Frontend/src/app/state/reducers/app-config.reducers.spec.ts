import { AppConfigState } from '../models/app-config-state';
import * as actions from '../actions/app-config.actions';
import { initialAppConfigState, appConfigReducer } from './app-config.reducers';

describe('AppConfigReducer', () => {
    describe('on an unknown action', () => {
        it('should not update the state', () => {
            const action = {
                type: 'Unknown',
            };
            const state = appConfigReducer(initialAppConfigState, action);

            expect(state).toBe(initialAppConfigState);
        });
    });

    describe('on initStart action', () => {
        it('should update the state in an immutable way', () => {
            // Arrange
            const expectedNewState = {
                isLoading: true,
                isConnectedToServer: false,
                isInGeneralError: false,
                componentUiStates: initialAppConfigState.componentUiStates,
            } as AppConfigState;

            // Act
            const action = actions.initStart();
            const state = appConfigReducer(initialAppConfigState, action);

            // Assert
            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    describe('on initOk action', () => {
        it('should update the state in an immutable way', () => {
            // Arrange
            const expectedNewState = {
                isLoading: false,
                isConnectedToServer: true,
                isInGeneralError: false,
                componentUiStates: initialAppConfigState.componentUiStates,
            } as AppConfigState;

            // Act
            const action = actions.initOk();
            const state = appConfigReducer(initialAppConfigState, action);

            // Assert
            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    describe('on initError action', () => {
        it('should update the state in an immutable way', () => {
            // Arrange
            const expectedNewState = {
                isLoading: false,
                isConnectedToServer: false,
                isInGeneralError: true,
                componentUiStates: initialAppConfigState.componentUiStates,
            } as AppConfigState;

            // Act
            const action = actions.initError({ errorMessage: 'err msg' });
            const state = appConfigReducer(initialAppConfigState, action);

            // Assert
            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    describe('on emitNotification action', () => {
        it('should update the state in an immutable way', () => {
            // Arrange
            const expectedNewState = {
                isLoading: initialAppConfigState.isLoading,
                isConnectedToServer: initialAppConfigState.isConnectedToServer,
                isInGeneralError: initialAppConfigState.isInGeneralError,
                componentUiStates: initialAppConfigState.componentUiStates,
                lastNotification: { text: 'an app notif', type: 'info' },
            } as AppConfigState;

            // Act
            const action = actions.emitNotification({
                appNotification: { text: 'an app notif', type: 'info' },
            });
            const state = appConfigReducer(initialAppConfigState, action);

            // Assert
            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    // TODO Tests for the other actions
});
