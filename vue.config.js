const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

// development、production。生产模式使用dist路径
// 不再做此设置，一切由服务端决定
// const publicPath = process.env.NODE_ENV === 'production' ? '/dist' : '/'

module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg
    // svg配置
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 配置模块搜索目录
    config.resolve.modules.add(resolve('./'))

    config.optimization.splitChunks({
      // chunks: 'all'
      // minSize: 4000000,
      // enforceSizeThreshold: 400000000,
      // cacheGroups: {
      //   default: {
      //     test: /[\\/]node_modules[\\/]/,
      //     chunks: 'all'
      //   }
      // }
      // maxSize: 3000000
    })
    // config.optimization.runtimeChunk('single')

    // config.optimization.minimize(true)

    // 用cdn方式引入
    config.externals({
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios'
    })
  },
  configureWebpack: config => {
    // 编译多个文件
    const entry = config.entry
    entry['index'] = './src/index.js'
    entry['elementui'] = 'element-ui'
  },
  // devServer: {
  //   proxy: 'http://localhost:44336/',
  //   https: false
  // },
  // outputDir: '../Easy.Admin/wwwroot/dist',
  // publicPath: publicPath,
  // 导入vue包含编译器 https://cli.vuejs.org/zh/config/#runtimecompiler
  runtimeCompiler: true,
  css: {
    extract: true
  }
}
