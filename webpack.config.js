const path = require('path');
var webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  devServer: {
    hot: true, // 热替换
    contentBase: path.join(__dirname, 'dist'), // server文件的根目录
    compress: true, // 开启gzip
    host: 'localhost',
    port: 8080, // 端口
    inline:true,  
	  historyApiFallback:true  
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR允许在运行时更新各种模块，而无需进行完全刷新
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: path.resolve(__dirname, 'dist/index.html')
    })
  ],
  resolve: {
    extensions:['.js','.jsx'],
    alias: {
      '@': path.resolve(__dirname, "src"),
    }
  },
  module: {
    rules: [
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']//程序会先加载css-loader，然后在加载style-loader文件
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
              modifyVars: {
                'primary-color': '#faad14',
                'link-color': '#1DA57A',
                'border-radius-base': '2px',
              },
              css:true,
              javascriptEnabled: true,
            },
          },
        }],
        // ...other rules
      }
    ]
  }
};