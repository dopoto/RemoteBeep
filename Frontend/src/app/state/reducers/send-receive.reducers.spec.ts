import { SendReceiveState } from '../models/send-receive-state';
import * as actions from '../actions/send-receive.actions';
import {
    initialSendReceiveState,
    sendReceiveReducer,
} from './send-receive.reducers';

describe('SendReceiveReducer', () => {
    describe('on an unknown action', () => {
        it('should not update the state', () => {
            const initialState = initialSendReceiveState;
            const action = {
                type: 'Unknown',
            };
            const state = sendReceiveReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('on changeGroup action', () => {
        it('should update the state in an immutable way using the passed group', () => {
            // Arrange
            const expectedNewState = {
                group: '234',
            } as SendReceiveState;

            // Act
            const action = actions.changeGroup({ group: '234' });
            const state = sendReceiveReducer(initialSendReceiveState, action);

            // Assert
            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    describe('on updateConnectionId action', () => {
        it('should update the state in an immutable way using the passed connection id', () => {
            // Arrange
            const expectedNewState = {
                group: initialSendReceiveState.group,
                connectionId: 'C1',
            } as SendReceiveState;

            // Act
            const action = actions.updateConnectionId({ connectionId: 'C1' });
            const state = sendReceiveReducer(initialSendReceiveState, action);

            // Assert
            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    describe('on addClientToGroup action', () => {
        it('should update the state in an immutable way using the passed client', () => {
            // Arrange
            const expectedNewState = {
                group: initialSendReceiveState.group,
                devicesInGroup: ['C1', 'C5', 'C7'],
            } as SendReceiveState;

            // Act
            const action = actions.addClientToGroup({
                addedConnectionId: '', //TODO Review
                connectionIds: ['C1', 'C5', 'C7'],
            });
            const state = sendReceiveReducer(initialSendReceiveState, action);

            // Assert
            expect(state).toEqual(expectedNewState);
            expect(state).not.toBe(expectedNewState);
        });
    });

    // TODO TEsts for the other actions
});
