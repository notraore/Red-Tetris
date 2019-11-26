const path = require('path')
// const config = require('./config/server')

const webpackConfig = {
  // devtool: config.devtool,
  // devServer: config.devServer || {},
  mode: 'production',
  entry: './src/client/index.js',

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/env', '@babel/react']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/[name].[ext]',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
}

module.exports = webpackConfig