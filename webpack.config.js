const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const glob = require("glob");
// const PurifyCSSPlugin = require("purifycss-webpack");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "production";
const _modeFlag = _mode === "production" ? true : false;
const mergeConfig = require(`./config/webpack.${_mode}.js`);
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const smp = new SpeedMeasurePlugin();

webpackConfig = {
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
    open:true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          _modeFlag ?
            MiniCssExtractPlugin.loader:
            'vue-style-loader',
          // MiniCssExtractPlugin.loader,
          {
            loader: "css-loader?sourceMap",
            // options: {
            //   modules: true,
            //   localIdentName: '[local]_[hash:base64:8]'
            // }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents : true
            }
          }
        ]
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     _modeFlag ?
      //       MiniCssExtractPlugin.loader:
      //       'vue-style-loader',
      //     {
      //       loader: "css-loader",
      //     },
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         javascriptEnabled: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  // devtool: _modeFlag ? 'cheap-module-source-map' : 'cheap-module-eval-source-map' ,
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
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(["./dist"]),
    new MiniCssExtractPlugin({
      filename: _modeFlag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeFlag ? "styles/[id].[hash:5].css" : "styles/[id].css"
    }),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, './dist/*.html')),
    // }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'myfood',
      filename: "index.html",
      template: "src/index.html"
    })
  ]
};

module.exports = smp.wrap(webpackMerge(mergeConfig, webpackConfig));
