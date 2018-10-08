//API
import { API } from '../instruments/api';

// Instruments
import {
    getStatusResponse,
    getJSON,
    propertyError
} from '../instruments/helpers';

export const tasksListActions = {
    REСEIVE_TASKS: 'REСEIVE_TASKS',
    ADD_TASK:      'ADD_TASK',
    UPDATE_TASK:   'UPDATE_TASK',
    DELETE_TASK:   'DELETE_TASK',
    REQUEST_TASKS: 'REQUEST_TASKS',
};

const receiveTasks = (tasks) => ({
    type: tasksListActions.REСEIVE_TASKS,
    tasks,
});

const requestTasks = () => ({
    type: tasksListActions.REQUEST_TASKS,
});

export const fetchTasks = () => (dispatch) => {

    dispatch(requestTasks());

    API.get()
        .then(getStatusResponse)
        .then(getJSON)
        .then(({ data }) => {
            dispatch(receiveTasks(data));
        })
        .catch((error) => propertyError(error));
};

export const addTask = ({ path = '', newTask }) => (dispatch) => {

    dispatch(requestTasks());

    API.post(path, newTask)
        .then(getStatusResponse)
        .then(getJSON)
        .then(({ data }) => {
            dispatch({
                type:    tasksListActions.ADD_TASK,
                newTask: data,
            });
        })
        .catch((error) => propertyError(error));
};

export const updateTasks = ({ path = '', updatedTasks, updatedStateTasks }) => (dispatch) => {

    dispatch(requestTasks());

    API.update(path, updatedTasks)
        .then(getStatusResponse)
        .then(getJSON)
        .then(() => {
            dispatch({
                updatedTasks: updatedStateTasks,
                type:         tasksListActions.UPDATE_TASK,
            });
        })
        .catch((error) => propertyError(error));
};

export const deleteTask = (path, updatedStateTasks) => (dispatch) => {

    dispatch(requestTasks());

    API.delete(path)
        .then(getStatusResponse)
        .then((response) => response)
        .then(() => {
            dispatch({
                updatedTasks: updatedStateTasks,
                type:         tasksListActions.DELETE_TASK,
            });
        })
        .catch((error) => propertyError(error));
};
