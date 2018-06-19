export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getIdTask (alphabet) {
    let randomId = '';

    for (let i = 0; i < 3; i++) {
        const randomInt = getRandomInt(alphabet.length);

        randomId += alphabet[randomInt].toLowerCase();
    }

    return randomId;
}

export function getTaskIndex (tasks, id) {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        return;
    }

    return index;
}

export function sortTasksByDate (a, b) {
    if (a.created > b.created) {
        return -1;
    }
    if (a.created < b.created) {
        return 1;
    }

    return 0;
}
