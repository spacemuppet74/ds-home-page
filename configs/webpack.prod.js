const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require('webpack')

const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

const BUILD_DIR = path.join(__dirname, "../dist");

const cleanWebpackPlugin = new CleanWebpackPlugin(["dist"], {
  root: path.join(__dirname, "../"),
  verbose: true
});

module.exports = merge(common, {
  devtool: "source-map",
  output: {
    chunkFilename: "[name].[chunkhash:4].js",
    filename: "[name].[chunkhash:4].js",
    path: BUILD_DIR
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },
    minimizer: [new UglifyWebpackPlugin({ sourceMap: true })]
  },
  plugins: [
    cleanWebpackPlugin,
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})]
});
