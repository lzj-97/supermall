import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const imgListenerMixin = {
  data() {
    return {
      imgListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);

    this.imgListener = () => {
      this.newRefresh();
    };

    this.$bus.$on('imgLoad', this.imgListener);
    // console.log('我是混入中的内容');
  }
};


export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    showBackTop(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000;
    }
  }
};
