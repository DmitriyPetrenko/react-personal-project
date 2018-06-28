//API
import { API } from '../instruments/api';

export const MESSAGE_VALUE = 'MESSAGE_VALUE';
export const REСEIVE_TASKS  = 'REСEIVE_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const REQUEST_TASKS = 'REQUEST_TASKS';
export const REQUEST_ERROR  = 'REQUEST_ERROR';

const receiveTasks = (tasks) => {
    return {
        type: REСEIVE_TASKS,
        tasks,
    };
};

const requestTasks = () => {
    return {
        type: REQUEST_TASKS,
    };
};

const requestError = (error) => {
    return {
        type: REQUEST_ERROR,
        error,
    };
};

export const fetchTasks = () => {
    return (dispatch) => {

        dispatch(requestTasks());

        API.get()
            .then((response) => response.json())
            .then(({ data }) => {
                dispatch(receiveTasks(data));
            })
            .catch((error) => dispatch(requestError(error)));
    };
};

export const addTask = (path, body) => {
    return (dispatch) => {

        dispatch(requestTasks());

        API.post(path, body)
            .then((response) => response.json())
            .then(({ data }) => {
                dispatch({
                    type: ADD_TASK,
                    task: data,
                });
                dispatch({
                    type:    MESSAGE_VALUE,
                    message: '',
                });
            })
            .catch((error) => dispatch(requestError(error)));
    };
};

export const updateTask = (path, body, tasks) => {
    return (dispatch) => {

        dispatch(requestTasks());

        API.update(path, body)
            .then((response) => response.json())
            .then(() => {
                dispatch({
                    type: UPDATE_TASK,
                    tasks,
                });
            })
            .catch((error) => dispatch(requestError(error)));
    };
};

export const deleteTask = (path, tasks) => {
    return (dispatch) => {

        dispatch(requestTasks());

        API.delete(path)
            .then((response) => response)
            .then((data) => {
                if (data.status === 204) {
                    dispatch({
                        type: DELETE_TASK,
                        tasks,
                    });
                }
            })
            .catch((error) => dispatch(requestError(error)));
    };
};
