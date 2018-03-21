const CWD = process.cwd();
const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : '/';

const webpack = require('webpack');
const SvgStorePlugin = require('webpack-svg-icon-system/lib/SvgStorePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    pollyfill: "babel-polyfill",
    main: './front-end/src/index.js',
  },

  output: {
    filename: '[name].js',
    path: `${CWD}/front-end/build`,
    publicPath: `/`,
    libraryTarget: 'umd',
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.(?:woff|otf|eot|ttf)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 50000,
        },
      },
    }, {
      test: /\.svg$/,
      loader: 'webpack-svg-icon-system',
      options: {
        name: 'public/images/sprites.svg'
      }
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ["style-loader", "css-loader", "sass-loader"]
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      exclude: /node_modules/,
      loader: "file-loader",
      options: {
        name: '/public/images/[name].[ext]',
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }],
  },

  plugins: [
    new SvgStorePlugin(),
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      BASE_URL: process.env.BASE_URL ? JSON.stringify(process.env.BASE_URL) : JSON.stringify('/'),
      API_URL: process.env.API_URL ? JSON.stringify(process.env.API_URL) : JSON.stringify('http://localhost:4000/rest')
    })
  ]
};
