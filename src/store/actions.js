// import { promised } from "q";

export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
        // context 上下文得意思 里面也有state 和 commit
    let oldProudct = context.state.cartList.find(item => item.iid === payload.iid)
    // 判断原来对象
    if(oldProudct){
      // 有得化 只是再里面得计数上加1
      context.commit('addCounter',oldProudct)
      resolve('当前商品数量加1')
    }else{
      // 这种情况说明 oldproduct为null
      payload.count = 1
      context.commit('addCart',payload)
      resolve('添加了新的商品')
    }
    })
  }
}