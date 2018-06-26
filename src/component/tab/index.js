export default {
    props: ['index', 'tabs'],
    onInit() {
        if (!this.index) {
            this.index = 0;
        }
        if (!this.tabs) {
            this.tabs = [{
                icon: 'home',
                text: '首页'
            }, {
                icon: 'chat',
                text: '原创'
            }];
        }
    },
    changeTab(evt) {
        this.index = evt.index;
        this.$dispatch('tabChange', evt);
    }
}