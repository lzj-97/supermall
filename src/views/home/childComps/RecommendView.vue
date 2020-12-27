<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div><span>{{item.title}}</span></div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
    justify-content: space-around;

  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
