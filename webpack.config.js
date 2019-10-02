const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "production";
const _modeFlag = _mode === "production" ? true : false;
const mergeConfig = require(`./config/webpack.${_mode}.js`);
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpackConfig = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: "runtime"
    }
  },
  devServer: {
    port: 8000,
    open:true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          _modeFlag ?
            MiniCssExtractPlugin.loader:
            'vue-style-loader',

          "css-loader",'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 10000, //小于多少k转成base64
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // 压缩 jpg/jpeg 图片
              mozjpeg: {
                progressive: true,
                quality: 65 // 压缩率
              },
              // 压缩 png 图片
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, './src'),
      '@assets': path.join(__dirname, './src/assets'),
      'root': path.join(__dirname),
      'lib': path.join(__dirname, './src/lib')
    }
  },
  plugins: [
    new CleanWebpackPlugin(["./dist"]),
    new MiniCssExtractPlugin({
      filename: _modeFlag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeFlag ? "styles/[id].[hash:5].css" : "styles/[id].css"
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'myfood',
      filename: "index.html",
      template: "src/index.html"
    })
  ]
};

module.exports = webpackMerge(mergeConfig, webpackConfig);