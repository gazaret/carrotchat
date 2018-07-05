const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const appPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

module.exports = {
  entry: {
    app: path.join(appPath, 'app.js'),
  },
  output: {
    path: distPath,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            collapseWhitespace: true,
          }
        }],
      }, {
        test: /\.(png|jpg|svg)$/,
        use: [
          'url-loader?limit=10000&name=image/[name].[ext]',
        ],
      }, {
        test: /\.js$/,
        exclude: ['node_modules'],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: [require('babel-plugin-angularjs-annotate')],
          },
        }],
      }, {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.html'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: [
        'style.css',
      ]
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'head',
      template: path.join(appPath, 'app.html')
    })
  ],
}