<template>
    <!-- 由于又多个导航，不适用id -->
    <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>

</template>

<script>
export default {
  name: 'NavBar'
}

</script>

<style scoped>
.nav-bar{
  display: flex;
  line-height: 44px;
  height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100,100,100,0.1)
}
.left,.right{
  /* 左边只放一个图标，所有宽度固定 */
  width: 60px;
  

}

.center{
  /* flex:1; */
  flex:1;
}


</style>