export const SEARCH_TASK = 'SEARCH_TASK';

export const getSearchValue = (value) => {
    return {
        type: SEARCH_TASK,
        value,
    };
};
