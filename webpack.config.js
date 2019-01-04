const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  target: "web",
  mode: "development",
  entry: "./src/app.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "coindesk.js",
    publicPath: "/dist"
  },
  stats: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
      Component: ["react", "Component"],
      Fragment: ["react", "Fragment"],
      PropTypes: "prop-types",
      connect: ["react-redux", "connect"],
      Actions: [path.resolve(__dirname, "./src/actions/index")],
      Helpers: [path.resolve(__dirname, "./src/helpers/index")],
      Reducers: [path.resolve(__dirname, "./src/reducers/index")],
      Components: [path.resolve(__dirname, "./src/components/index")],
      Pages: [path.resolve(__dirname, "./src/pages/index")],
      Link: ["react-router-dom", "Link"]
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "src"),
    historyApiFallback: {
      index: "index.html"
    },
    stats: "none",
    compress: true,
    port: 3000
  }
};
