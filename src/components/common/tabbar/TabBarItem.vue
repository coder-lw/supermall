<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isShow"><slot name='item-icon'></slot></div>
      <div v-else><slot name='item-icon-active'></slot></slot></div>
      <div :style="activeStyle"><slot name='item-text'></slot></div>
    </div>

</template>

<script>
export default {
  name: 'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'deeppink'
    }
  },
  data(){
    return{
      // isShow:true
    }
  },
  computed: {
    isShow(){
      // 判断当前活跃路由的地址是不是被包含再当前本地的地址 拿出返回值做判断不等于-1的时候
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 通过判断是不是处于活跃的路由 是的话，就把传入的颜色，添加到style样式里 不是的话就返回为空  
    // 根据之前的设定 不传值显示默认设置的颜色
    activeStyle(){
      return this.isShow ? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      this.$router.push(this.path)
    }
  },
}

</script>

<style scoped>

.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;

}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
}


</style>