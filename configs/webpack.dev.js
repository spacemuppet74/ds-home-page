const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: "index.html",
  template: path.join(__dirname, "../", "index.html")
});

module.exports = merge(common, {
  devtool: "cheap-module-eval-source-map",
  devServer: {
    historyApiFallback: true,
    overlay: true,
    stats: "normal",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  },
  plugins: [htmlWebpackPlugin]
});
