const webpack = require('webpack');
const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');


const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client/app');

const config = {
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env'
    }),
    new webpack.SourceMapDevToolPlugin(
            'bundle.js.map', null,
            "[absolute-resource-path]", "[absolute-resource-path]")
  ]


};

module.exports = config;
