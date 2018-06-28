import * as AllTasksCompleted from './AllTasksCompleted';
import * as NewTask from './NewTask';
import * as SearchTask from './SearchTask';
import * as TaskList from './TaskList';

export const {
    allTasksCompleted,
} = AllTasksCompleted;
export const {
    getMessageValue,
} = NewTask;
export const {
    getSearchValue,
} = SearchTask;
export const {
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
} = TaskList;
