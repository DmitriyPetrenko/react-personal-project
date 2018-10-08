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

const sortTasksByAttr = (a, b) => {
    if (a.completed > b.completed) {
        return 1;
    }

    if (a.completed < b.completed) {
        return -1;
    }

    if (a.favorite < b.favorite) {
        return 1;
    }

    if (a.favorite > b.favorite) {
        return -1;
    }

    return 0;
};

export const sortTasks = (tasks) => {
    if (tasks.length === 0) {
        return;
    }

    const cloneTasks = [...tasks];

    cloneTasks.sort(sortTasksByDate);
    cloneTasks.sort(sortTasksByAttr);

    return cloneTasks;
};

export const propertyError = (error) => {
    throw new Error(error);
};

export const getStatusResponse = (response) => {
    switch (response.status) {
        case 200:
        case 204: {
            return Promise.resolve(response);
        }
        default: {
            return Promise.reject(propertyError(response.statusText));
        }
    }
};

export const getJSON = (response) => response.json();
