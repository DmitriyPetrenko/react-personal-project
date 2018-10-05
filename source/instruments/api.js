// Config
import { ENDPOINT, TOKEN } from '../config/api';

const request = (method, path = '', body) => {
    const url = `${ENDPOINT}/${path}`;
    const options = {
        method,
        headers: {
            'Authorization': TOKEN,
            'content-type':  'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(new Request(url, options));
};

export const API = {
    get () {
        return request('GET');
    },
    post (path, data) {
        return request('POST', path, data);
    },
    update (path, data) {
        return request('PUT', path, data);
    },
    delete (path) {
        return request('DELETE', path);
    },
};
