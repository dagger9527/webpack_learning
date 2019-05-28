// 自动打开浏览器的插件
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// 打包css
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// 压缩js
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var webpack = require('webpack')

const path = require('path')

module.exports = {
  optimization: {   // 优化项目
    minimizer: [
      new UglifyJsPlugin({     // 优化js
        cache: true,   // 是否缓存
        parallel: true,   // 是否并发
        // sourceMap: true // 源码映射 set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin()    // css 的优化
    ]
  },
  // webpack-dev-server服务器配置
  devServer: {
    port: 3000, // 端口
    progress: true, // 显示进度条
    open: true, // 自动打开浏览器
    compress: true,  // 压缩
    index: 'index.html',  // 使用openPage可能会导致webpack-dev-server浏览器不更新问题
    contentBase: './dist',
    // openPage: 'dist/index.html'  // 同上，地址栏会变化
  },
  mode: 'development',  // (development)开发模式，不压缩和混淆代码; (production)生产模式，压缩并混淆代码, 默认生产模式, production才会使optimization选项生效，development不生效
  entry: {
    app: "./main.js",
    // vendor: ['jquery'], // 这里配置那些第三方模块需要和项目打包文件分开的
  },  // 打包入口文件，一般在这里require需要的模块
  output: {
    path: path.resolve(__dirname, 'dist'),  // 当前项目根目录 dist下
    // filename: "[hash:8].min.js" // 打包所有文件的js生成的文件名 
    filename: 'js/bundle.min.js'
  },
  externals: {  // 打包要排除的模块
    // jquery: 'jquery'
  },
  module: {
    // loaders, 菜鸟教程上写的loader，已经过时了
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$'
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', // 这个也可以转化class语法了,不再需要再装@babel/plugin-proposal-class-properties插件了
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { 'legacy': true }], // 转化装饰器@log
                '@babel/plugin-transform-runtime', // 转化如迭代器这些高级语法
              ],
            }
          },
        ],
        exclude: /node_modules/ // 不打包node_modules文件夹下的依赖js文件
      },
      {
        test: /\.css$/,
        // loader: "style-loader!css-loader" // loader和use都可以
        use: [  // 使用use的方式可以为每个loader做详细配置
          {
            loader: MiniCssExtractPlugin.loader,  // 将css文件打包到css压缩文件中，利用这个插件
          },  
          // {
          //   loader: 'style-loader',  // 所以不需要style-loader了
          //   options: {
          //     insertAt: true  // 让自定义的style是最高优先级
          //   }
          // },
          {
            loader: 'css-loader',
            options: {
              // modules: true, // 让本地的css生效还是全局的 true:全局 | false:本地, 默认本地
            }
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,  // 将所有需要加载的css打包成独立文件
          // {
          //   loader: 'style-loader',
          // },
          {
            loader: 'css-loader', // css加载器
            options: {
            }
          },
          'postcss-loader', // 然后将css解析加上浏览器兼容前缀
          'less-loader' // 从下往上处理顺序（顺便默认从右到左）, 先将less转化css
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader', // 读取图片还得装个file-loader: npm i -D file-loader
            options: {
              limit: 8192,
              outputPath: 'img/'
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({ // html自动生成，打包模块
      title: 'test',
      template: 'main.html',  // html源文件，以此文件为模板打包
      filename: 'index.html',  // html打包文件所在路径，运行webpack打包，会自动在demo5目录下生成index.html,并加入所需要的依赖
      // hash: true,
      minify: {
        // removeAttributeQuotes: true, // 删除属性双引号，如果属性value有逗号删除失败
        collapseWhitespace: true // 折叠空行变成一行
      }
    }),
    // new OpenBrowserPlugin({ // 自动打开浏览器模块
    //   url: 'http://localhost:3000/demo5/index.html'  // url地址。配置好之后还要装webpack-dev-server，启动报错是因为找不到项目中的webpack和webpack-cli，我是全局安装的这两个模块。所以需要在本地项目中也装上
    // }),
    new webpack.DefinePlugin({  // 定义环境变量
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.min.css'  // 打包之后的文件名
    }),
    new webpack.ProvidePlugin({
      $: 'jquery' // 全局jquery变量 $
    })
  ],
  // 将第三方模块打包成commons.min.js
  // 这里把上面的选项覆盖掉了，所以一直压缩css失败
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // }
};