<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" @load="contentImgLoaded" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        currentLength: 0,
      }
    },
    methods: {
      contentImgLoaded() {
        this.currentLength ++;
        // console.log('this.currentLength==',this.currentLength);
        // console.log('this.subcategories.list.length==',this.subcategories.list.length);
        if (this.currentLength !== this.subcategories.list.length) return;
        this.$emit('contentImgLoaded');
      }
    }
  }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
