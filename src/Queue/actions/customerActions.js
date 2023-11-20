import { SET_CUSTOMERS } from './actionTypes';

export const setCustomers = (customers) => ({
    type: SET_CUSTOMERS,
    payload: customers,
});