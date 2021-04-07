<template>
  <div class="detail-swiper" >
    <swiper class="swiper-item">
      <swiper-item v-for="item in topImages" >
        <!-- 需要动态绑定src属性 因为会一直变 -->
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
// 导入轮播图文件
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
  name:'DetailSwiper',
  components:{
    Swiper, 
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>
.swiper-item{
  height: 300px;
  overflow: hidden;
}
</style>