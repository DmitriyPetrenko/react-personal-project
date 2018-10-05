export const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const sortTasksByDate = (a, b) => {
    if (a.created > b.created) {
        return -1;
    }

    if (a.created < b.created) {
        return 1;
    }

    return 0;
};

export const sortTasks = (tasks) => {
    if (tasks.length === 0) {
        return;
    }

    const favorite = [];
    const completed = [];
    const other = [];
    const copyTasks = [...tasks];

    copyTasks.sort(sortTasksByDate);

    copyTasks.forEach((task) => {
        if (task.favorite && !task.completed) {
            favorite.push(task);
        }
        if (task.completed) {
            completed.push(task);
        }
        if (!task.favorite && !task.completed) {
            other.push(task);
        }
    });

    return [...favorite, ...other, ...completed];
};

export const propertyError = (error) => {
    throw new Error(error);
};

export const getStatusResponse = (response) => {
    if (response.status !== 200) {
        return Promise.reject(propertyError(response.statusText));
    }

    return Promise.resolve(response);
};

export const getJSON = (response) => response.json();
