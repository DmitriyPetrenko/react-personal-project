//Actions
import { MESSAGE_VALUE } from '../actions/NewTask';

export const newTaskMessageReducer = (state, action) => {
    switch (action.type) {
        case MESSAGE_VALUE:
            return action.message;
        default:
            return state;
    }
};
