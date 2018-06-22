import router from '@system.router';
import {
    APIROOT
} from '../utils/api';

export default {
    data: {
        loading: true,
        id: '',
        title: '',
        url: '',
    },
    onInit() {
        this.title && this.$page.setTitleBar({
            text: this.title
        });
        if (this.id) {
            this.url = `${APIROOT}/post/${this.id}`;
        }
    },
    onBackPress() {
        this.$element('web').canBack({
            callback: (e) => {
                if (e) {
                    this.$element('web').back();
                } else {
                    router.back()
                }
            }
        })
        return true;
    },
    finish() {
        this.loading = false;
    }
}