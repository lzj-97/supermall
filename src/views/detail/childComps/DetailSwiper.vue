<template>
  <swiper>
    <swiper-item v-for="item in topImages" class="swiper-item">
      <img :src="item" alt="" @load="imgLoaded">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper";

  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        // default() {
        //   return [];
        // }
      }
    },
    data() {
      return {
        isLoaded: false,
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
    methods: {
      imgLoaded() {
        if(!this.isLoaded){
          this.$emit('imgLoaded');
          this.isLoaded = true;
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-item {
    height: 300px;
    overflow: hidden;
  }
</style>
