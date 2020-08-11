const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
module.exports = {
  entry: {
    index: './src/index.js',
  },
  mode: 'none',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /src/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: true,
    'crypto-js': 'CryptoJS',
    'sockjs-client': 'SockJS',
    antd: 'antd'
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    // new BundleAnalyzerPlugin()
  ],
};
