import router from '@system.router';
import {
    dateFormat
} from '../utils/utils';
import * as Api from '../utils/api';
import * as Cache from '../utils/cache';

export default {
    private: {
        showBorder: false,
        titleOpacity: 0,
        scrollY: 0,
        list: [],
        page: 1,
        hasMore: false,
        refreshing: false,
    },
    onInit() {
        this.getFirstData();
    },
    dateFormat: dateFormat,
    // 首次打开数据获取
    async getFirstData() {
        this.refreshing = true;

        const promises = [Api.getNewsList(this.page), this.$app.newsListCache];
        let res = await Promise.race(promises);
        
        // 非第一次打开，有缓存情况
        if (res) {
            // 把数据换成真实数据
            promises[0].then(ret => {
                this.list = ret.posts;
                Cache.set('newsList', ret);
            });
        } else {
            // 第一次打开，没有缓存情况
            res = await promises[0];
            Cache.set('newsList', res);
        }
        this.list = res.posts;
        this.refreshing = false;
        this.hasMore = res.pages.totalPage > this.page;
    },
    async getData() {
        const res = await Api.getNewsList(this.page);
        if (this.page === 1) {
            this.list = res.posts;
            Cache.set('newsList', res);
        } else {
            this.list = this.list.concat(res.posts);
        }
        this.refreshing = false;
        this.hasMore = res.pages.totalPage > this.page;
    },
    scroll(ev) {
        this.scrollY += ev.scrollY
        let titleOpacity = this.scrollY > 0 ? this.scrollY / (360 - 102) : 0
        if (titleOpacity > 1) {
            titleOpacity = 1
        }
        this.titleOpacity = titleOpacity
        this.showBorder = this.titleOpacity >= 1
    },
    refresh() {
        this.refreshing = true;
        this.page = 1;
        this.getData();
    },
    loadMore() {
        this.page++;
        this.getData();
    },
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