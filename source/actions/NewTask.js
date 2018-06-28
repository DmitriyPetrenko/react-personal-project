export const MESSAGE_VALUE = 'MESSAGE_VALUE';

export const getMessageValue = (message) => {
    return {
        type: MESSAGE_VALUE,
        message,
    };
};
