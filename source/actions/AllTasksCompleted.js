export const ALL_TASKS_COMPLETED = 'ALL_TASKS_COMPLETED';

export const allTasksCompleted = (value) => {
    return {
        type: ALL_TASKS_COMPLETED,
        value,
    };
};
