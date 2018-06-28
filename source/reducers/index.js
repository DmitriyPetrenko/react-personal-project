// Initital state
import initialState from './initialState';

//Sub reducers
import { tasksReducer } from './TaskList';
import { newTaskMessageReducer } from './NewTask';
import { searchValueReducer } from './SearchTask';
import { allTasksCompletedReducer } from './AllTasksCompleted';

const scheduler = (state = initialState, action) => {
    return {
        tasks:             tasksReducer(state.tasks, action),
        newTaskMessage:    newTaskMessageReducer(state.newTaskMessage, action),
        searchValue:       searchValueReducer(state.searchValue, action),
        allTasksCompleted: allTasksCompletedReducer(state.allTasksCompleted, action),
    };
};

export default scheduler;
