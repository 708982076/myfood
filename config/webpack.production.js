const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
  output: {
    filename: "scripts/[name].[hash:5].bundle.js",
    publicPath: '/myfood/'
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}