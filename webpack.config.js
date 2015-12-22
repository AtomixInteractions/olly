
var webpack = require('webpack');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
var DEVELOPMENT = process.env.NODE_ENV === 'development';

var dirSrc = __dirname + '/src/';


var config = {
  context: dirSrc,
  entry: {
    restservice: './service.js'
  },
  // target: 'node',
  // watch: DEVELOPMENT,
  cache: DEVELOPMENT,
  debug: DEVELOPMENT,
  output: {
    path: __dirname + '/lib/',
    filename: '[name].js',
    pathinfo: DEVELOPMENT,
    library: ['ras'],
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      // { test: /\.js$/, loader: 'babel-loader', query: { optional: 'runtime' } }
    ]
  },
  plugins: (function(){
    if (!DEVELOPMENT) {
      return [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
      ]
    }
    else {
      return [];
    }
  })(),
  resolve: {
    root: __dirname,
    modulesDirectories: [__dirname + '/node_modules', __dirname, '../node_modules', __dirname + '/lib'],
    extensions: ['', '.js']
  }
};

module.exports = config;