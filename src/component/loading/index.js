

export default {
    props: ['type'],
    private: {
        imgurl: '/common/image/loading.gif'
    },
    onInit() {
        if (this.type === 'skeleton') {
            this.imgurl = '/common/image/skeleton.png';
        }
    }
}