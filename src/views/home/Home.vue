<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="['流行', '新款', '精选']"
                 class="tabControl"
                 ref="topTab"
                 @tabClick="tabClick" v-show="isShowTabControl"></tab-control>

    <scroll class="content"
            :probe-type="3"
            :pull-up-load="true"
            ref="scroll"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行', '新款', '精选']"
                   class="tab-control"
                   ref="contentTab"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>

    <!--
    .native修饰符让组件可以监听原生事件
    -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {imgListenerMixin} from "common/mixin";


  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    mixins: [imgListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isShowTabControl: false,
        saveY: 0,
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata();

      // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      // 1.图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 100);
      //
      // this.imgListener = () => {
      //   refresh();
      // };
      //
      // // this.$bus.$on('homeImgLoad', this.imgListener);
      // this.$bus.$on('imgLoad', this.imgListener);
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
      console.log('homeActivated');
    },
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.scrollY;

      // 2.取消全局事件的监听
      this.$bus.$off('imgLoad', this.imgListener);
    },
    destroyed() {
      console.log('home destroyed');
    },
    computed: {
      showGoodsList() {
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page+1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishedPullUp();
          // this.$refs.scroll.refresh();
        });
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }

        this.$refs.contentTab.currentIndex = index;
        this.$refs.topTab.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000;

        // 2.决定tabControl是否吸顶(position: fixed)
        // console.log(-position.y);
        this.isShowTabControl = -position.y > this.tabOffsetTop;
      },
      loadMore() {
        console.log('上拉加载更多');
        this.getHomeGoods(this.currentType);
      },
      swiperLoaded() {
        // 2.获取tabControl的offsetTop
        // 所有组件都有一个$el:用于获取组件的根元素
        this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop;
      }
    }
  }
</script>

<style scoped>
  .home {
    /*padding-top: 44px;*/
    /*width: 100%;*/
    height: 100vh;
    /*margin-top: 44px;*/
    position: relative;
    /*padding-top: 44px;*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*使用浏览器原生滚动时*/
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  .tabControl {
    position: relative;
    z-index: 1;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
  /*  height: 300px;*/
  /*}*/

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
