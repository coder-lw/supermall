<template>
  <div class="toast"  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data(){
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message,duration){
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message =''
      },duration)
    }
  }
}
</script>
<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color:rgba(0,0,0,0.5);
    z-index: 9999;
    padding: 5px 10px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    border-radius: 10px;
  }
</style>