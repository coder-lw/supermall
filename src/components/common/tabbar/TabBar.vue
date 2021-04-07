<template>
    <div id="tab-bar">
      <slot></slot>
    </div>

</template>

<script>
export default {
  name: 'TabBar',
  components:{
    
  }
}

</script>

<style scoped>

#tab-bar{
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 -1px 1px rgba(138, 122, 122, 0.1);
  z-index: 9;
}

</style>