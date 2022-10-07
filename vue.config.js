const { defineConfig } = require('@vue/cli-service')

const target = 'http://localhost:8080'
module.exports = defineConfig({
  configureWebpack: {
    performance: {
      maxEntrypointSize: 5120000,
      maxAssetSize: 5120000
    }
  },
  devServer: {
    port: 3000,
    proxy : {
    "/api/" : {target, changeOrigin: true},
    }
  },
})