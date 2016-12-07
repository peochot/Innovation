var webpack = require('webpack');
var path = require('path');
var webpackConfig = {
  entry: [
    // 'webpack-dev-server/client?http://localhost:8080',
    // 'webpack/hot/only-dev-server',
    './app/app.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/public',
    filename: 'bundle.js'
  },
  watch: false,
  devtool: 'source-map',
  debug: true,
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/, // js / jsx
        loaders: ['babel-loader'], // is handled by babel loader with es2015 support,

      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: process.env.PORT ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
    ] : [],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'], // what file extensions babel looks for in imports
    root: path.resolve(__dirname), // absolute imports
    modulesDirectories: ['node_modules']
  },
};

module.exports = webpackConfig;
