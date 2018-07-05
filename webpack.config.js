const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: '/\.html$/',
        use: [
          'html-loader',
        ],
      }, {
        test: '/.(png|jpg|svg)$/',
        use: [
          'url-loader?limit=10000&name=image/[name].[ext]',
        ],
      }, {
        test: '/.css$/',
        use: [
          'style-loader',
          'css-loader',
        ],
      }, {
        test: '/.js$/',
        exclude: ['node_modules'],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: [require('babel-plugin-angularjs-annotate')],
          },
        }],
      }, {
        test: '/.scss$/',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                minimize: true,
                sourceMap: false,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
              },
            },
          ],
        }),
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
    new ExtractTextPlugin({
      filename: 'style.css'
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