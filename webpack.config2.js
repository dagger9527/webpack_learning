const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const CleanWebpack = require('clean-webpack-plugin')
const CopyWebPack = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  // 多入口
  mode: 'development',  // development | production
  entry: {
    index: './demo6/index.js',
    // other: './demo6/other.js'
    // bootstrap: ['bootstrap'],
  },
  devServer: {
    port: 8080,
    compress: true,
    // contentBase: './dist',
    // index: 'index.html',
    // openPage: 'index.html',
    index: 'app.html',
    open: true,
    progress: true,
    proxy: {  // 配置跨域
      '/api': {
        target: 'https://www.easy-mock.com/mock/5c71ff83ff28d75a9197808c/demo1',  // easy-mock模拟数据baseUrl
        pathRewrite: { '^/api': '' }, // 请求以/api开头，删掉
        changeOrigin: true, // 允许https
      }
    },
    // hot: true,
  },
  // devtool: 'source-map',  // 在chrome下经测试不会报错第几行
  // devtool: 'eval-source-map', // 所以换用这个，他不会产生map文件
  // devtool: 'cheap-module-source-map', // 产生了map文件，还是不会报错第几行
  devtool: 'cheap-module-eval-source-map',  // 没有产生map文件，指定了报错第几行，和eval-source-map类似，
  // 测试环境为Chrome.73.0，推测chrome不支持读取map文件,测试和理论结果不一致
  watch: false,
  watchOptions: {
    poll: 100,
    aggregateTimeout: 100,
    ignored: /node_modules/,
  },
  output: {
    filename: '[name].js',
    // filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [path.resolve('node_modules')],
    // mainFields: ['style', 'main'],  // 先找css后找js
    // extensions: ['.js', '.css', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
            loader: 'postcss-loader',
            options: {
                plugins: (loader) => [
                    require("postcss-custom-properties")
                ]
            }
        }]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'test',
      template: 'main.html',
      filename: 'app.html',
      // chunks: ['index'],  // index.html页面只引入entry下的index对应的页面
      hash: true,
    }),
    // new HTMLWebpackPlugin({
    //   filename: 'other.html',
    //   chunks: ['other', 'index'], // 都引入了
    // }),
    // new CleanWebpack(), // 这个插件会在运行webpack-dev-server的时候也把目录清空
    // new CopyWebPack([
    //   {from: 'img', to: './img'},
    // ]),
    // new webpack.BannerPlugin('大哥哥 v1.0')
    // new webpack.DllReferencePlugin({
      // manifest: path.resolve(__dirname, 'dist', 'manifest.json')  // 如果manifest.json已经存在了引入的模块，那么这个模块就可以不用引入
    // }),
    // new webpack.NamedChunksPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
}