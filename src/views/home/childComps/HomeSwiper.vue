<template>
  <Swiper>
      <SwiperItem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image923" alt=""@load="imageLoad">
        </a>
      </SwiperItem>
    </Swiper>
</template>

<script>
// 导入轮播图组件的js文件
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name: 'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components: {
    Swiper, 
    SwiperItem
  },
  methods:{
    imageLoad(){
      // 这里只需要发射一次事件

      // 加层判断  isload类似开关  如果发射 将该变量该值  第二次发射时取反  就不会再发射事件
      if(!this.isLoad){
        this.$emit('swiperImageLoad');
        this.isLoad = true
      }
      
    }
  }
}
</script>

<style>

</style>






































