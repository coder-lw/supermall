export default {
  // mutations唯一得目的就是修改state中得状态 mutations中得每一个方法尽可能完成得事件比较单一一点
  addCounter(state,payload){
    // 目的是可以跟踪
    payload.count++
  },
  addCart(state,payload){
    // 新添加一个属性  用来记录该商品的选中和不选中状态 默认为true
    payload.checked = true
    state.cartList.push(payload)
  }

}