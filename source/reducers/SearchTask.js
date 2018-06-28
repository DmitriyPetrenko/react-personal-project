//Actions
import { SEARCH_TASK } from '../actions/SearchTask';

export const searchValueReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_TASK:
            return action.value;
        default:
            return state;
    }
};
