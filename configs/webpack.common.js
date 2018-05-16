const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: "styles/[name].css",
  chunkFileName: "[id].css"
});

const BUILD_DIR = path.join(__dirname, "../dist");
const APP_DIR = path.join(__dirname, "../src");

module.exports = {
  entry: {
    bundle: ["babel-polyfill", "whatwg-fetch", APP_DIR + "/index.js"]
  },
  output: {
    filename: "[name].js",
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        // Handles loading Images
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        // Handles loading fonts
        test: /\.(ttf|eot|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "./styles/fonts/[name].[ext]",
            publicPath: "../"
          }
        }
      },
      {
        // Handles loading CSS & SCSS
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: {
                safe: true
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions", "ie > 9"]
              },
              sourceMap: true,
              plugins: () => [require("autoprefixer")]
            }
          },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        // Handles loading js
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "../src/"),
      components: path.resolve(__dirname, "../src/components"),
      models: path.resolve(__dirname, "../src/models"),
      pages: path.resolve(__dirname, "../src/pages"),
      services: path.resolve(__dirname, "../src/services"),
      stores: path.resolve(__dirname, "../src/stores"),
      utils: path.resolve(__dirname, "../src/utils"),
    }
  },
  plugins: [miniCssExtractPlugin]
};

