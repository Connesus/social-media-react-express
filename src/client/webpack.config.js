const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', ".tsx", ".scss", 'css']
  },
  devServer: {
    port: 8000,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/**': {  //catch all requests
        target: '/index.html',  //default target
        secure: false,
        bypass: function(req, res, opt){
          //your custom code to check for any exceptions
          //console.log('bypass check', {req: req, res:res, opt: opt});
          if(req.path.indexOf('/img/') !== -1 || req.path.indexOf('/src/') !== -1){
            return '/'
          }

          if (req.headers.accept.indexOf('html') !== -1) {
            return '/index.html';
          }
        }
      }
    }
  },
  plugins: [
      new HtmlWebpackPlugin({
    hash: true, // For cache busting
    filename: '../dist/index.html',
    title: process.env.TITLE,
    template: "src/index.html",
    favicon: "src/favicon.ico"
      }),
    new Dotenv({systemvars: true})
  ]
}
