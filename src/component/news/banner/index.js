import router from '@system.router';

export default {
    props: ['banners'],
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