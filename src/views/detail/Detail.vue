<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            :probe-type="3"
            @scroll="contentScroll"
            ref="scroll">
      <detail-swiper :top-images="topImages" @imgLoaded="imgLoaded"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoaded="imgLoaded"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  // import BackTop from "components/content/backTop/BackTop";

  import {getDetail, Goods, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {imgListenerMixin, backTopMixin} from "common/mixin";
  import {mapActions} from "vuex";


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // BackTop,
    },
    mixins: [imgListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        res: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTops: [],
        currentIndex: 0,
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid;

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部轮播图数据
        // console.log(res);
        this.res = res;
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 3.获取店铺信息
        this.shop = data.shopInfo;

        // 4.获取商品详情
        this.detailInfo = data.detailInfo;

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 6.获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);

        this.recommends = res.data.list;
      });

      this.getThemeTops = debounce(() => {
        this.themeTops = [];
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.params.$el.offsetTop);
        this.themeTops.push(this.$refs.comment.$el.offsetTop);
        this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        this.themeTops.push(Number.MAX_VALUE);
        // console.log(this.themeTops);
      });

    },
    mounted() {
      // console.log('mounted');
      // 1.图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 100);
      //
      // this.imgListener = () => {
      //   refresh();
      // };
      //
      // this.$bus.$on('imgLoad', this.imgListener);

      // this.$bus.$on('detailImgLoad', () => {
      //   refresh();
      // });

    },
    destroyed() {
      this.$bus.$off('imgLoad', this.imgListener);
    },
    methods: {
      ...mapActions(['addCart']),
      imgLoaded() {
        // this.$refs.scroll.refresh();
        this.newRefresh();
        this.getThemeTops();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 500);
      },
      contentScroll(position) {
        // console.log(position);
        // 1.监听滚动到哪个主题
        const positionY = -position.y;
        let length = this.themeTops.length;

        // 优化后的判断代码(往数组中添加一个最大的值减少判断-用空间换时间)
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && positionY >= this.themeTops[i] && positionY < this.themeTops[i+1]) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = i;
          }
        }


        // for (let i = 0; i < length; i++) {
        //   if (this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTops[i] && positionY < this.themeTops[i+1])
        //       || (i === length-1 && positionY >= this.themeTops[i]))) {
        //
        //     this.currentIndex = i;
        //     this.$refs.nav.currentIndex = i;
        //   }
        // }

        // 2.监听返回按钮是否显示
        this.showBackTop(position);
      },
      addToCart() {
        console.log('addToCart');
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // this.$store.cratList.push(product);
        // this.$store.commit('addToCart', product);

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })

        this.addCart(product).then(res => {
          console.log(res);
          this.$toast({
            message: res,
          });
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    height: calc(100% - 44px - 58px);
  }
</style>
