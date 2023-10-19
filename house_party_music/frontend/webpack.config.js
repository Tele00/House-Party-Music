const path = require("path");
const webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

module.exports = {
  //target: 'node', // in order to ignore built-in modules like path, fs, etc. 
  //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 

  resolve: {
    fallback: {
      util: require.resolve("util/"),
      "crypto": require.resolve("crypto-browserify"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
      "constants": require.resolve("constants-browserify"),
      "fs": false,
      "child_process": false,
      "worker_threads": false,
      "inspector": false
    }
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        //exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};
