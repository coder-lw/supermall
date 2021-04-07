module.exports = {
  // 这里配置 导出之后 会公共的部分合并的
  configureWebpack:{
    // 配置路径
    resolve:{
      alias:{
        // 内部默认 @ 对应的是src
        'assets':'@/assets',
        'common':'@common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
}