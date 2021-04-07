
<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    
    <!-- 底部汇总 -->
    <bottom-bar></bottom-bar>
  </div>
</template>
  
<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./cartComps/CartList"
import BottomBar from './cartComps/BottomBar'


import {mapGetters} from "vuex"
export default {
  name: 'Cart',
  data(){
    return {
      names:{
        'li':1,
        'wei':2,
        'jia':3
      }
    }
  },
  components:{
    NavBar,
    CartList,
    BottomBar
    
  },
  computed:{
    // 这个东西上对getters里面得方法进行了解构
    // 会将getters里面得所有东西转换成计算属性

    // 两种语法
    // ...mapGetters(['cartLength','cartList'])
    // 第二种语法
    ...mapGetters({
      length:'cartLength',
      
      })
    }
  
}

</script>

<style>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color:var(--color-tint);
  color:#fff;
  font-weight: 700;
}

</style>