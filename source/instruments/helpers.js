export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function sortTasksByDate (a, b) {
    if (a.created > b.created) {
        return -1;
    }
    if (a.created < b.created) {
        return 1;
    }

    return 0;
}

export function sortTasks (tasks) {
    if (tasks.length === 0) {
        return;
    }
    let sortedTasks = [];
    const favorite = [];
    const completed = [];
    const other = [];

    tasks.sort(sortTasksByDate);

    tasks.forEach((task) => {
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

    sortedTasks = [...favorite, ...other, ...completed];

    return sortedTasks;

}
