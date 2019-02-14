const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  output: {
    filename: "scripts/[name].[hash:5].bundle.js",
    publicPath: '/'
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}