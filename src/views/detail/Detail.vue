<template>
  <div id="deatil">
    <detail-nav-bar class="detail-nav"
    ref="nav"
                    @activeClick="activeClick"/>
    <scroll class="contenta" ref="scroll" @scroll="contentScroll" :probe-type="3" >
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageload="imageload"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/> 
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBacktop"></back-top>
    <!-- <toast :message="message" :show="show" /> -->
    
  </div>
</template>
<script>
// 子组件得导入
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"

// 公共组件得导入
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
// 工具方法
import {debounce} from '../../common/utils.js';
import {itemListenerMixin,backTopMixin} from "../../common/mixin.js"
// 网络请求得引入
import {getDetail,Goods,Shop,GoodsParam,gerRecommend} from 'network/detail'

import Toast from "components/common/toast/Toast"
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Toast,
    Scroll
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      // 用于保存iid  默认为null
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      itemImgListener:null,
      // 主题得Y轴得高度
      // 商品直接就是0
      themeTopYs:[],
      currentIndex:0,
      message:'',
      show:false
    }
  },
  created(){
    // 1、保存请求过来得iid 通过动态路由 后面加/:iid
    this.iid = this.$route.params.iid
    // 2、根据拿到得对应得iid 去请求数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      // 对数据座一层传话 节省
      const data = res.result
      //1、 获取顶部图片轮播数据
      this.topImages = res.result.itemInfo.topImages
      //2、获取商品信息  用封装的类处理整合了goods里面的数据
      // 后面可以直接使用对用的数据 传入最外部的三个大数据 剩下的小的里面封装时做了处理
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //3、 创建商家信息 用一个对象保存
      this.shop = new Shop(data.shopInfo)
      //4、获取detailInfo信息 并保存
      this.detailInfo = data.detailInfo
      // 5、获取paramInfo数据
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 6、取出评论信息   有的地方是没有评论的  所以最好是加一层判断
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      } })
     // 3、请求推荐数据
    gerRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted(){
    
  },
  methods:{
    imageload(){
      this.$refs.scroll.scroll.refresh();
      this.themeTopYs = []
      this.themeTopYs.push(0) 
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      
      console.log(this.themeTopYs)
    },
    activeClick(index){
      // 求Y得位置  就是对应主题得位置 创建了一个变量存放四个顶部按钮得位置y得距离 
      // 直接把这个变量 放到scrollTo得y上    因为按钮得index 和变量中数组得位置距离 是意义对应得
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){
      this.isShowBacktop = (-position.y) > 1000
      // 1、取出值
      const positionY = -position.y
      // 2、positionY和主题中得对比
      // [0, 6928, 7568, 7879]
      // 第一种情况 i < length-1
      // positionY 在 0    6928 之间， index = 0
      // positionY 在 6928 7568之间，  index = 1
      // positionY 在 7568  7879 之间，index = 2

      // 第二种情况  i = length-1
      // positionY 在 超过  7879，     index = 3

      // 取出数组中得index下标 因为对应着按钮
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++){
        // if(positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[i+1]){//   console.log(i);
        // }
        // 先判断this.currentIndex !== i   在判断后面的两种情况
        // 这样第一次不符合条件 但是默认值是0 后面条件符合 并且下面把i的值赋值给currentindex 这样也只能执行一次 
        if(this.currentIndex !== i && 
         ((i < length-1 && positionY >= this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[i+1]) 
        || (i === length-1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i;
          console.log(this.currentIndex)
          // 拿到要操作的组件 导航的组件 需要绑定ref

          // 帮代表这一主题区域的currentindex赋值给 要操作组件的currentindex 操作的组件接受到 就会改变按钮选中中状态
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart(){
      // 1、获取购物车需要展示得信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      // iid一定要传过去  iid作为商品得唯一标识
      // 需要把iid反馈给服务器 告诉用户购买得是哪一个商品
      product.iid = this.iid
      // 2、将商品添加到购物车里 把事件提交给mutation
      this.$store.dispatch('addCart',product).then(res => {
        // 添加到购物车成功
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },2000)
        this.$toast.show(res,2000)
      })
    }
  },
  // 销毁时  因为没有缓存
  destroyed(){
    // 取消全局事件监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  }
}
</script>
<style scoped>
#deatil{
  position:relative;
  /* z-index: 10; */
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.contenta{
  overflow: hidden;
  position: absolute;
  background-color: #fff;
  z-index: 10;
  top:44px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>