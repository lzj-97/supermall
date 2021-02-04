<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list :cart-list="cartList" class="cart-list"/>

    <cart-bottom-bar/>
  </div>
</template>

<script>
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import NavBar from "components/common/navbar/NavBar";

  import { mapGetters } from 'vuex';

  export default {
    name: "Cart",
    data() {
      return {
      }
    },
    components: {
      CartList,
      CartBottomBar,
      NavBar,
    },
    computed: {
      ...mapGetters([
          'cartLength',
          'cartList',
      ]),

      // ...mapGetters({
      //   length: 'cartLength',
      // }),
    },
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .cart-list {
    background: #f2f2f2;
  }
</style>
