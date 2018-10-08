// Actions
import {
    tasksListActions
} from '../actions/TaskList';

// Instruments
import { sortTasks } from '../instruments/helpers';

const {
    REСEIVE_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    REQUEST_TASKS,
} = tasksListActions;

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
                items:      sortTasks([action.newTask, ...state.items]),
            };
        case UPDATE_TASK:
            return {
                ...state,
                isFetching: false,
                items:      sortTasks(action.updatedTasks),
            };
        case DELETE_TASK:
            return {
                ...state,
                isFetching: false,
                items:      action.updatedTasks,
            };
        case REQUEST_TASKS:
            return {
                ...state,
                isFetching: true,
            };
        default:
            return state;
    }
};
