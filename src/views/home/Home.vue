<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
     <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick" 
                     v-show="isTabFixed" 
                     ref="tabControl1" class="tab-control"/>
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    :pull-up-load="true"
    @pullingUp="loadMore"
    @scroll="contentScroll">
      <home-swiper :banners="banners"
                    @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"  
                     ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list> 
    </scroll>
    <!-- 监听组件点击事件 需要加上.native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBacktop"></back-top>
 

  </div>


</template>

<script>
// home 子组件视图组件得导入
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"
// 公共组建
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/TabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import BackTop from 'components/common/backTop/BackTop'

// 导入封装好的请求数据的中间层函数 getHomeMultidata
import {getHomeMultidata,getHomeGoods} from "network/home";
import {debounce} from '../../common/utils';
import {itemListenerMixin} from "../../common/mixin.js"


export default {
  name: 'Home',
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    NavBar,
    GoodsList,
    Scroll,
    BackTop

  },
  data(){
    // 把请求到的数据保存起来
    return {
      // 保存
      banners:[],
      recommends:[],
      goods:{
        "pop":{page:0,list:[]},
        "new":{page:0,list:[]},
        "sell":{page:0,list:[]}
      },
      currentType:'pop',
      isShowBacktop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null
    }
  },
  created(){
    //1、请求多个数据  当前接口包括的数据有 轮播图 和其它数据
    this.getHomeMultidata();
    // 2、请求商品数据 调用三次 请求三类数据得第一页
    this.getHomeGoods('pop');
    this.getHomeGoods('sell');
    this.getHomeGoods('new');

    
    },
    mounted(){

    },
    mixins:[itemListenerMixin],
  computed:{
    showGoods(){
      return this.goods[this.currentType].list 
    }
  },
  destroyed(){
    // 监听销毁路由
    console.log('home 销毁')
  },
  // 进来时
  activated(){
    // 设置滚到得距离 为离开时savey保存得位置信息
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    // 再刷新一次  调用refresh方法
    this.$refs.scroll.refresh()
  },
  // 离开时
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()

  // 取消全局事件监听
  this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods:{
    // 网络请求方法
    getHomeMultidata(){
        getHomeMultidata().then(res => {
        // console.log(res);
        // 用变量 分别保存不同的数据 
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list; 
      }, err => {
        console.log(err);
      })
    },
    getHomeGoods(type) {
      // 当前goods [type] 类型的对象的页码数 赋值给用来请求数据的page +1 做为动态获取当前页码的实参传进去
      const page = this.goods[type].page + 1
      // type是用来外调用这个方法时 请求数据的类型
      getHomeGoods(type,page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        // 请求一次数据之后  页码加1 用于下次请求新的数据
        this.goods[type].page += 1
        // 完成了上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    //事件监听相关方法

    // 防抖 里面两个参数 第一个是函数   第二个是等待时间（单位时间内等多久）
    // debounce(func,delay){
    //   let timer = null
    //   return function(...args){
    //     if(timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this,args)
    //     },delay)
    //   }
    // },
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 保持两个组件内的按钮点击选中  同步
      this.$refs.tabControl1.currentindex = index;
      this.$refs.tabControl2.currentindex = index;
    },
    backClick(){
      // 通过ref拿到scroll组件对象 在.scroll拿到scroll变量 调用scroll得scrollTo方法
      this.$refs.scroll.scrollTo(0,0,300);
    },
    contentScroll(position){
      // backtop的显示和隐藏
      this.isShowBacktop = (-position.y) > 1000
      // 决定tabcontrol是否吸顶  设置position：fixed
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      // 上拉加载
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad(){
       // 1、获取到tabControl的oddeseTop属性  组件上没有该属性  所以应该是去拿组建上的元素
      // 所有的属性都有一个属性$el,用于获取组件中的元素的
      // mounted里面取出该属性的高度，不是图片加载完成的   所以要放在图片加载完成的地方获取该属性的值

      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      
    }
   
  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  /* margin-top: 44px; */
}
.home-nav{
  background-color:var(--color-tint);
  color: #fff;
  /* 自己加的 */
  font-weight: bold;
  /* 因为是局部滚动  所以nav-bar不需要脱离文档流固定 */
  /* position: fixed;
  left:0;
  top: 0;
  right: 0;
  z-index: 9; */
}
.tab-control{
  position: relative;
  z-index: 9;
}

.content{
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>