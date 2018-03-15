var webpack = require('webpack');

module.exports = {
  entry: './front/src/index.js',
  output: {
    path: __dirname + '/front/dist/static',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
