import nativeFetch from '@system.fetch';
import prompt from '@system.prompt';
import shortcut from '@system.shortcut';

/**
 * toast信息
 * @param {string} message 
 */
export function toast(message) {
    return prompt.showToast({
        message: message
    });
}

/**
 * fetch
 * @param {object} options 
 */
export function fetch(options) {
    return new Promise((resolve, reject) => {
        nativeFetch.fetch(Object.assign(options, {
            success: (data) => {
                resolve(data.data);
            },
            fail: (data, code) => {
                reject({
                    data,
                    code
                });
            }
        }));
    });
}

/**
 * Post请求
 * @param {string} url 
 * @param {string|object} data 
 */
fetch.post = (url, data) => {
    return fetch({
        url,
        data,
        method: 'POST'
    });
};

/**
 * Get请求
 * @param {string} url 
 * @param {string|object} data 
 */
fetch.get = (url, data) => {
    return fetch({
        url,
        data,
        method: 'GET'
    });
};

/**
 * 创建桌面图标
 */
export function createShortcut() {
    return new Promise((resolve, reject) => {
        shortcut.hasInstalled({
            success: (ret) => {
                if (ret) {
                    resolve(ret);
                } else {
                    shortcut.install({
                        success: resolve,
                        fail: reject
                    });
                }
            },
            fail: reject
        });
    });
}

/**
 * 时间格式化
 * @param {object|string} d 需要格式的时间
 * @param {string} fmt 默认：yyyy-MM-dd hh:mm:ss
 */
export function dateFormat(d, fmt = 'yyyy-MM-dd hh:mm:ss') {
    let date = new Date(d);
    let o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}