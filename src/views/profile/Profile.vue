<template>
  <div class="profile">
    <NavBar class="nav-bar">
      <template #center>我的档案</template>
    </NavBar>
    <UserInfo/>
    <AccountInfo/>
    <NormalListView :list-data="orderList"/>
    <NormalListView :list-data="serviceList"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import AccountInfo from "./childComps/AccountInfo";
  import NormalListView from "./childComps/NormalListView";
  import UserInfo from "./childComps/UserInfo";

  export default {
    name: "Profile",
    components: {
      NavBar,
      AccountInfo,
      NormalListView,
      UserInfo,
    },
    data() {
      return {
        orderList: [
          {icon: 'message.svg', info: '我的消息'},
          {icon: 'pointer.svg', info: '积分商城'},
          {icon: 'vip.svg', info: '会员卡'},
        ],
        serviceList: [
          {icon: 'cart.svg', info: '我的购物车'},
          {icon: 'shopping.svg', info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
  .profile {
    background: #f2f2f2;
  }

  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }
</style>
