<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
        class="check-button"
       :is-check="isSelectAll"
       @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate">去计算:{{cot}}</div>
  </div>
  
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

	export default {
    name: "BottomBar",
    components:{
      CheckButton,
    },
    computed:{
      totalPrice(){
        return "￥" + this.$store.state.cartList.filter(item => {return item.checked}).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      cot(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.$store.state.cartList.length === 0) return false
        return !(this.$store.state.cartList.filter(item => !item.checked).length)
      }
    },
    methods:{
      checkClick(){
        this.$store.state.cartList.forEach(element => {
          element.checked = !element.checked
        });
      }
    }
   
	}
</script>

<style scoped>
  .bottom-bar {
   height: 40px;
   width: 100%;
   background-color:#fff;
   position: fixed;
   bottom: 49px;
   /* line-height: 40px; */
   display: flex;

  }
.check-button{
  /* width: 20px;
  height: 20px; */
  /* line-height: 20; */
  margin-right: 5px;
}
.check-content{
  
  margin-left: 5px;
  display: flex;
  align-items: center;
  border: none;
  /* justify-content: center; */
  box-sizing: border-box;

} 
span{
  border: none;
}
.price{
  flex:1;
  line-height: 40px;
  text-align: center;
}
.calculate{

  line-height: 40px;
  width: 80px;
  height: 49px;
  background-color: pink;
  text-align: center;
}
</style>
