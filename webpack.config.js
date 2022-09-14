const path = require('path');

module.exports = {
  entry: {
    visitors: './js/visitors.js',
    sunrise: './js/sunrise-time.js',
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};