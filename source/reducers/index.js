// Initital state
import { INITIAL_STATE } from '../config';

//Sub reducers
import { tasksReducer } from './TaskList';
import { searchValueReducer } from './SearchTask';
import { allTasksCompletedReducer } from './AllTasksCompleted';

const scheduler = (state = INITIAL_STATE, action) => ({
    tasks:             tasksReducer(state.tasks, action),
    searchValue:       searchValueReducer(state.searchValue, action),
    allTasksCompleted: allTasksCompletedReducer(state.allTasksCompleted, action),
});

export default scheduler;
