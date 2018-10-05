export const MAX_LENGTH = 50;
export const INITIAL_STATE = {
    allTasksCompleted: false,
    searchValue:       '',
    tasks:             {
        isFetching: true,
        items:      [],
        error:      '',
    },
};
