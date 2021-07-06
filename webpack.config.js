const path = require('path');
const ProgressPlugin = require('progress-webpack-plugin')
const args = process.argv.slice(2);
let https = false;
let disableCORP = true;
if (args.includes('--https')) https = true;
if (args.includes('--corp')) disableCORP = false;
console.log('https', https);
console.log('disableCORP', disableCORP);

module.exports = {
  module: {
      rules: [
          {
              test: /\.css/i,
              loader: "css-loader"
          }
      ]
  },
  entry: { index: './src/index.jsx'},
  output: {
    path: path.resolve(__dirname, '/static'),
    publicPath: '/static',
    hashDigestLength: 5,
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    https,
    cert: './localhost.crt',
    key: './localhost.key',
    host: '0.0.0.0',
    port: 9999,
    hot: true,
    overlay: true,
    historyApiFallback: false,
    watchContentBase: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': https
        ? 'https://0.0.0.0:9999'
        : 'http://0.0.0.0:9999'
    },
    open: 'chrome',
    openPage: https ? 'https://127.0.0.1:9999' : 'http://127.0.0.1:9999'
  },
  mode: 'development',
  plugins:[
    new ProgressPlugin(true)
  ]
};