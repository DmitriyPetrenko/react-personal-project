//Actions
import { ALL_TASKS_COMPLETED } from '../actions/AllTasksCompleted';

export const allTasksCompletedReducer = (state, action) => {
    switch (action.type) {
        case ALL_TASKS_COMPLETED:
            return action.value;
        default:
            return state;
    }
};
