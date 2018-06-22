import router from '@system.router';

export default {
    props: ['title', 'showLeft', 'hideBorder', 'opacity'],
    goback() {
        router.back();
    }
}