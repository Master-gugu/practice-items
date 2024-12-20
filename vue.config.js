let config = require('./src/api/config/settings.js').config
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/practice-items/' : '/',
  outputDir: 'docs',
  transpileDependencies: true,
  devServer: {
    open: false, // 启动服务后打开浏览器
    host: '0.0.0.0', // 指定使用IP地址
    port: 6060, // 设置端口号
    https: true, // 使用http协议
    proxy: {
      '/api': {
        target: config.base_url, // 代理地址
        pathRewrite: {
          '^/api': '' // 重写路径，在请求的时候去掉 /api
        },
        changeOrigin: true, // 是否跨域
        // logLevel: 'debug',  // 添加此行
      }
    }
  }
})


