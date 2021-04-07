import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store/index.js"
import toast from './components/common/toast/index'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
// 安装插件
Vue.use(toast)

// 解决移动端的300毫秒的延迟
FastClick.attach(document.body)

// 使用图片懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
