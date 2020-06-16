const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/index.jsx"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@CreateIssuePage": path.resolve(__dirname, "src/views/CreateIssuePage/"),
      "@CreateMilestonePage": path.resolve(__dirname, "src/views/CreateMilestonePage/"),
      "@IssueDetailPage": path.resolve(__dirname, "src/views/IssueDetailPage/"),
      "@IssueListPage": path.resolve(__dirname, "src/views/IssueListPage/"),
      "@LabelListPage": path.resolve(__dirname, "src/views/LabelListPage/"),
      "@LoginPage": path.resolve(__dirname, "src/views/LoginPage/"),
      "@MilestonePage": path.resolve(__dirname, "src/views/MilestonePage/"),
      "@SignupPage": path.resolve(__dirname, "src/views/SignupPage/"),
      "@ErrorPage": path.resolve(__dirname, "src/views/ErrorPage/"),
      "@CommentViewBox": path.resolve(__dirname, "src/components/CommentViewBox/"),
      "@FilterButton": path.resolve(__dirname, "src/components/FilterButton/"),
      "@InputBox": path.resolve(__dirname, "src/components/InputBox/"),
      "@NavigationButton": path.resolve(__dirname, "src/components/NavigationButton/"),
      "@Header": path.resolve(__dirname, "src/components/Header/"),
      "@Table": path.resolve(__dirname, "src/components/Table/"),
      "@Style": path.resolve(__dirname, "src/style/"),
      "@Lib": path.resolve(__dirname, "src/lib/"),
      "@Constants": path.resolve(__dirname, "src/constants/"),
      "@Modules": path.resolve(__dirname, "src/modules/"),
      "@Components": path.resolve(__dirname, "src/components/"),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
