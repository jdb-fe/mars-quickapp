import storage from '@system.storage';

export function get(key, parse = true) {
    return new Promise((resolve, reject) => {
        storage.get({
            key: key,
            success: (data) => {
                resolve((parse && data) ? JSON.parse(data) : data);
            },
            fail: (data, code) => {
                reject({
                    data,
                    code
                });
            }
        });
    });
}

export function set(key, value) {
    return new Promise((resolve, reject) => {
        storage.set({
            key: key,
            value: typeof value === 'object' ? JSON.stringify(value) : value,
            success: resolve,
            fail: (data, code) => {
                reject({
                    data,
                    code
                });
            }
        });
    });
}

export function del(key) {
    return new Promise((resolve, reject) => {
        storage.delete({
            key: key,
            success: resolve,
            fail: (data, code) => {
                reject({
                    data,
                    code
                });
            }
        });
    });
}

export function clear() {
    return new Promise((resolve, reject) => {
        storage.clear({
            success: resolve,
            fail: (data, code) => {
                reject({
                    data,
                    code
                });
            }
        });
    });
}