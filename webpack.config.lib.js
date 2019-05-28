const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // mode: '',
  entry: {
    bootstrap: ['bootstrap'],
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist', 'lib'),
    library: '[name]',
    libraryTarget: 'var',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json'),
    }),
    new CleanWebpackPlugin(),
  ]
}