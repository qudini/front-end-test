import reducer, { initialState } from "./reducer";
import {SET_CUSTOMERS} from "./actions/actionTypes";
import {setCustomers} from './actions/customerActions'

describe(`the reducer module`, () => {
    it(`should have the following initialState`, () => {
        expect(initialState).toHaveProperty('customers');
        expect(initialState.customers).toHaveLength(0)
    });

    it(`should return the initialState on the default case`, () => {
        // Given
        const action = {
            type: 'TEST'
        };

        // When
        const result = reducer(undefined, action);

        // Then
        expect(result).toEqual(initialState)
    });
    it('should create an action to set customers', () => {
        // Given
        const customers = [{
            customer: {
                id: 1,
                name: 'John Doe',
                emailAddress: 'john.doe@example.com',
            },
            gravatarUrl: 'mocked-url',
            expectedTime: '2023-11-20T12:00:00.000Z',
        },];

        // When
        const expectedAction = {
            type: SET_CUSTOMERS,
            payload: customers,
        };

        // Then
        expect(setCustomers(customers)).toEqual(expectedAction);
    });
});
