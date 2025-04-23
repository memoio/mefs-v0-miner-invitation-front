let root = __dirname,
webpack = require('webpack'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
CopyWebpackPlugin = require('copy-webpack-plugin'),
CleanWebpackPlugin = require('clean-webpack-plugin'),
OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// class Global{
//   constructor(){
//     this.global = this
//   }
// }
// let global = new Global()
/*
 编译scss
 合并js
 压缩html js css
 */
module.exports = {
  // 唯一入口文件
  entry: root  + '/app.js',
  output: {
    // 打包后文件存放的地方
    path: root + '/dist',
    // 打包后输出文件的文件名
    filename: 'js/index.js',
  },
  // resolveLoader:{
  //   modules:[
  //     `${root}/src/webpack/rules`,
  //     'node_modules',
  //   ]
  // },
  module:{
    rules: [
      // {
      //   test: /\.js$/,
      //   use: 'babel-loader'
      // },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader:`${root}/src/webpack/loader/ssi-loader/index.js`,
          options:{
            root:`${root}/src/`,
            out:`${root}/dist/index.html`,
          },
        }],
      }
    ]
  },
  plugins: [
    //热加载
    // new webpack.HotModuleReplacementPlugin(),
    // 静态文件拷贝
    // new CopyWebpackPlugin([
    //   {
    //     from:`${root}/src/img`,
    //     to:'img'
    //   },
    //   {
    //     from:`${root}/src/lib`,
    //     to:'lib'
    //   },
    // ]),
    // css
    new ExtractTextPlugin({
      filename:'css/index.css',
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true
    }),
    // 输出前清空目录
    // new CleanWebpackPlugin(),
    // new webpack.DefinePlugin(global),
  ],
}