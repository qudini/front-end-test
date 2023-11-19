import { SET_CUSTOMERS } from './actions/actionTypes';

export const initialState = {
    customers: [],
};

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CUSTOMERS:
            return { ...state, customers: action.payload };
        default:
            return state;
    }
};

export default queueReducer;
