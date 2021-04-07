<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
      class="cart-list-item" 
       v-for="(item,index) in cartList"
       :item-info="item"
       :key="index"/>
    </scroll>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem"

export default {
  name:'CartList',
  computed:{
    ...mapGetters(['cartList'])
  },
  components:{
    Scroll,
    CartListItem
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
.cart-list{
  /* height: 100vh; */
}
.content{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 89px;
  top: 44px;
  overflow: hidden;
  /* height: 100vh; */
}
</style>