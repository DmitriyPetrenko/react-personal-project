// Actions
import {
    REСEIVE_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    REQUEST_TASKS,
    REQUEST_ERROR
} from '../actions/TaskList';

// Instruments
import { sortTasks } from '../instruments/helpers';

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case REСEIVE_TASKS:
            return {
                ...state,
                isFetching: false,
                items:      sortTasks(action.tasks),
            };
        case ADD_TASK:
            return {
                ...state,
                isFetching: false,
                items:      sortTasks([action.task, ...state.items]),
            };
        case UPDATE_TASK:
            return {
                ...state,
                isFetching: false,
                items:      sortTasks(action.tasks),
            };
        case DELETE_TASK:
            return {
                ...state,
                isFetching: false,
                items:      action.tasks,
            };
        case REQUEST_TASKS:
            return {
                ...state,
                isFetching: true,
            };
        case REQUEST_ERROR:
            return {
                ...state,
                isFetching: false,
                error:      action.error,
            };
        default:
            return state;
    }
};
