import router from '@system.router';
import {
    dateFormat
} from '../utils/utils';

export default {
    props: ['data'],
    dateFormat,
    openArticle(id, title) {
        router.push({
            uri: 'webview',
            params: {
                id: id,
                title: title
            }
        });
    }
}