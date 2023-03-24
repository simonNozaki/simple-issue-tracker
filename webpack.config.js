const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public")
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  }
}
