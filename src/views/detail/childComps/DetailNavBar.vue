<template>
  <div id="deatil">
     <nav-bar >
       <div slot="left" class="icon" @click="backClick">
         <img src="~assets/img/common/back.svg" alt="">
       </div>
       <div slot="center" class="title">
         <div v-for="(item,index) in titles"
          :class="{active:currentIndex === index}"
           @click="activeClick(index)">{{item}}</div>
       </div>
     </nav-bar>
  </div>
</template>
<script>
// 公共组件得导入
import NavBar from "components/common/navbar/NavBar"
export default {
  name:'DetailNavBar',
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  created(){
    
  },
  methods:{
    activeClick(index){
      this.currentIndex = index;
      // 把事件发给详情页  详情页内部需要监听点击
      this.$emit('activeClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title div{
  flex:1;
}
.active{
  color: var(--color-high-text);
}
.icon img{
  font-size: 12px;
  vertical-align: middle;
}
</style>