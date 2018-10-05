import * as AllTasksCompleted from './AllTasksCompleted';
import * as SearchTask from './SearchTask';
import * as TaskList from './TaskList';

export const {
    allTasksCompleted,
} = AllTasksCompleted;
export const {
    getSearchValue,
} = SearchTask;
export const {
    fetchTasks,
    addTask,
    updateTasks,
    deleteTask,
} = TaskList;
