const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: './src/vendor/index.js',
    mb: ['./src/mb/index.jsx', './src/mb/res/index.less', './src/mb/index.html']
  },
  output: {
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/chunk.[id].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devServer: {
    compress: true,
    hot: false,
    hotOnly: false,
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: false,
    watchOptions: {
      poll: false
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'font-awesome.less': path.resolve(__dirname, './node_modules/font-awesome/less/font-awesome.less'),
      'normalize.css': path.resolve(__dirname, './node_modules/normalize.css/normalize.css')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.jpg$/,
        use: ['url-loader?name=[path][name].[ext]&limit=10240']
      },
      {
        test: /\.png$/,
        use: ['url-loader?name=[path][name].[ext]&limit=10240']
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        use: ['file-loader?name=assets/fonts/[name].[ext]']
      },
      {
        test: /\.html$/,
        use: [
          'file-loader?name=[name].html',
          'extract-loader',
          'html-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new ExtractTextPlugin('assets/css/[name].css')
  ]
};
