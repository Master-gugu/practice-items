const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/practice-items/',
  transpileDependencies: true,
  devServer: {
    open: false, // 启动服务后打开浏览器
    host: '0.0.0.0', // 指定使用IP地址
    port: 6060, // 设置端口号
    https: false, // 使用http协议
    proxy: {
      '/api': {
        target: 'http://192.168.2.33:9090', // 代理地址
        pathRewrite: {
          '^/api': '' // 重写路径，在请求的时候去掉 /api
        },
        changeOrigin: false, // 是否跨域
      }
    }
  }
})
