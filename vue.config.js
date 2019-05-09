const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

// development、production。生产模式使用dist路径
const publicPath = process.env.NODE_ENV === 'production' ? '/dist' : '/'

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
  },
  configureWebpack: config => {},
  devServer: {
    proxy: 'https://localhost:44336/',
    https: false
  },
  publicPath: publicPath,
  // 导入vue包含编译器 https://cli.vuejs.org/zh/config/#runtimecompiler
  runtimeCompiler: true
}
