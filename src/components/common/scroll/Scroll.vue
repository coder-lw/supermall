<template>
<!-- 做外层 -->
  <div class="wrapper" ref="wrapper">
    <!-- 再加一层做内层 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 导入
  import BScroll from 'better-scroll'


export default {
  name:'Scroll',
  // 需要把scroll变量保存
  data(){
    return {
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  // 生命周期函数  这个是DOM挂载之后的
  mounted(){
    // 创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      // 如果直接设置写死  会一直回调  会影响性能
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    // 监听滚动位置
    this.scroll.on('scroll',(position) => {
      // 通过自定义事件将 position当作参数发出去
      // console.log(position)
      this.$emit('scroll',position)
    })
    // 监听滚动到底部
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
      
    }
      
   
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>
<style scoped>


</style>