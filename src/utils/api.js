import {
    fetch,
    toast
} from './utils';

export const APIROOT = 'http://news.noonme.com';

function transformResponse(res) {
    if (res.error && res.error.returnCode !== 0) {
        toast(res.error.returnUserMessage);
        throw res;
    }
    return JSON.parse(res).data;
}

export function getNewsList(page = 1) {
    return fetch.get(`${APIROOT}/api/post`, {
        page: page
    }).then(transformResponse);
}