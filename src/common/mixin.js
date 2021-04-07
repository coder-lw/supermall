import {debounce} from "./utils"
import BackTop from "../components/common/backTop/BackTop.vue"
export const itemListenerMixin = {
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener = () => {
      refresh()
    }
    
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isShowBacktop:false
    }
  },
  methods:{
    backClick(){
      // 通过ref拿到scroll组件对象 在.scroll拿到scroll变量 调用scroll得scrollTo方法
      this.$refs.scroll.scrollTo(0,0,300);
    },
  }
} 