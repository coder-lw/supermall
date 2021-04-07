// 导入request
import {request} from "./request"

// 请求详情页数据得方法
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

// 请求推荐商品的数据  新的接口
export function gerRecommend(){
  return request({
    url:'/recommend'
  })
}

// 数据的整合 定义一个类 es6语法   相当于es5的构造函数
// new对象之后 传入参数  这个对象就会直接由上面的属性 参数了
export class Goods {
  constructor(itemInfo, columns, services) {
    // 用一个对象 对数据进行整合  再传数据的时候 直接把这一个数据传过去就可以了
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}
// 商家信息整合
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}


export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}