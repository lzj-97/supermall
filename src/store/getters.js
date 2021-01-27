export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  },
  payNum(state) {
    return state.cartList.filter((product) => product.checked === true).length;
  }
}
