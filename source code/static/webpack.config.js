const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = {
  entry: {
  'bundle.min.css':  __dirname + '/css/root.css',
  'bundle.js': __dirname + '/index.jsx'

  },
    output: {
        path: __dirname + '/dist',
        filename: '[name]',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
                 fallback: 'style-loader',
                 use: 'css-loader',
               })
        }
      ]
  },
  plugins: [  new ExtractTextPlugin('bundle.min.css') ]
};
module.exports = config;
