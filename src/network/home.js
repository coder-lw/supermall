// 导入request
import {request} from "./request"

// 封装针对首页的数据请求的函数的管理
// 能够更好的管理和区分  方便管理整个首页
export function getHomeMultidata(){
  return request({
    // 别处连用这个函数就再这里请求数据了
    url:'/home/multidata',
    methods:"get"
  })
  // 把请求到的数据 return 出去 给调用该方法的地方
}
// 需要传过来得页码和数据类型  q请求商品数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}




