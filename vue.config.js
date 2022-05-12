const apiMocker = require('mocker-api')
const path = require('path')
module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'dev',
  configureWebpack: config => {
    return {
      devServer: {
        before(app) {
          apiMocker(app, path.resolve('./mocker/index.js'))
        }
      }
    }
  }
}