module.exports = {
  plugins:{
    autoprefixer: {},
    'postcss-px-to-viewport':{
      viewportWidth:375, //视口的宽度 按照750的设计稿 一个点有两像素
      viewportHeight:667,
      unitPrecision:5, //指定px 转换为视口单位值得小数位数（很多时候无法整除）
      viewportUnit:'vw', //指定需要转换成的视口单位，建议使用VW
      selectorBlackList:['ignore','tab-bar','tab-bar-item'], //指定不需要转换的类
      minPixelValue:20, //小于活等于1px不转换为视口单位
      mediaQuery:false //允许在某提查询转换‘px'
    }
  }
}