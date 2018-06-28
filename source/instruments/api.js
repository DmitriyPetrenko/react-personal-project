// Config
import { endpoint, token } from '../config/api';

const request = (method, path, body) => {
    const url = `${endpoint}/${path}`;
    const options = {
        method,
        headers: {
            'Authorization': token,
            'content-type':  'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(new Request(url, options));
};

export const API = {
    get ({ path = '' } = {}) {
        return request('GET', path);
    },
    post (path = '', data = []) {
        return request('POST', path, data);
    },
    update (path = '', data = []) {
        return request('PUT', path, data);
    },
    delete (path = '') {
        return request('DELETE', path);
    },
};
