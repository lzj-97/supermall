<template>
  <div class="category">
    <nav-bar class="nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"
                ref="menu"></tab-menu>

      <tab-control :titles="['综合', '新品', '销量']"
                   class="top-tab-control"
                   ref="topTabControl"
                   @tabClick="tabClick"
                   v-show="isShowTab"/>

      <scroll class="scroll"
              ref="scroll"
              :probeType="3"
              :key="currentIndex"
              @scroll="scroll">

        <tab-content-category :subcategories="subCategory"
                              @contentImgLoaded="contentImgLoaded"
                              ref="tabContent"/>

        <tab-control :titles="['综合', '新品', '销量']"
                     @tabClick="tabClick"
                     ref="tabControl"/>
        <tab-content-detail :category-detail="showDetail"/>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import TabControl from "components/content/tabControl/TabControl";

  import TabMenu from "./childComps/TabMenu";
  import TabContentDetail from "./childComps/TabContentDetail";
  import TabContentCategory from "./childComps/TabContentCategory";

  import {getCategories, getSubCategory, getCategoryDetail} from "network/category";

  export default {
    name: "Category",
    data() {
      return {
        categories: [],
        subCategory: {},
        categoryDetail: {
          'pop': [],
          'new': [],
          'sell': [],
        },
        currentIndex: -1,
        tabControlTop: 0,
        isShowTab: false,
        currentType: 'pop'
      }
    },
    components: {
      NavBar,
      Scroll,
      TabControl,
      TabMenu,
      TabContentDetail,
      TabContentCategory,
    },
    created() {
      // 1.获取商品分类信息
      this._getCategories();
      setTimeout(() => {
        this.$refs.menu.$refs.scroll.refresh();
      }, 1000);

      // 2.监听图片加载完成
      this.$bus.$on('imgLoad', () => {
        this.$refs.scroll.refresh();
      })
    },
    computed: {
      showDetail() {
        return this.categoryDetail[this.currentType];
      }
    },
    methods: {
      btnClick() {
        console.log('btnClick');
      },
      _getCategories() {
        getCategories().then(res => {
          this.categories = res.data.category.list;

          this._getSubCategory(0);
        });
      },
      _getSubCategory(index) {
        this.currentIndex = index;
        this.isShowTab = false;

        getSubCategory(this.categories[index].maitKey).then(res => {
          this.subCategory = res.data;

          let miniWallkey = this.categories[index].miniWallkey;
          this._getCategoryDetail(miniWallkey, 'pop');
          this._getCategoryDetail(miniWallkey, 'new');
          this._getCategoryDetail(miniWallkey, 'sell');
          // setTimeout(() => {
          //   this.$refs.scroll.refresh();
          // },1000);
        });
      },
      _getCategoryDetail(miniWallkey, type) {
        getCategoryDetail(miniWallkey, type).then(res => {
          this.categoryDetail[type] = res;
        });
      },
      selectItem(index) {
        this._getSubCategory(index);
        this.tabClick(0);
      },
      contentImgLoaded() {
        setTimeout(() => {
          this.tabControlTop = this.$refs.tabControl.$el.offsetTop;
        }, 1000);
      },
      scroll(position) {
        this.isShowTab = -position.y > this.tabControlTop;
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

        this.$refs.tabControl.currentIndex = index;
        this.$refs.topTabControl.currentIndex = index;
      },
    }
  }
</script>

<style scoped>
  .category {
    height: 100vh;
  }

  .nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex;
  }

  .scroll {
    flex: 1;
    position: relative;
  }

  .top-tab-control {
    position: fixed;
    left: 100px;
    right: 0;
    top: 44px;
    z-index: 1;
  }
</style>
