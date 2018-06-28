const initialState = {
    allTasksCompleted: false,
    newTaskMessage:    '',
    searchValue:       '',
    tasks:             {
        isFetching: true,
        items:      [],
        error:      '',
    },
};

export default initialState;
