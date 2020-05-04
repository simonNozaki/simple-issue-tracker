const path = require("path");

module.exports = {
    mode: "production",
    entry: "./js/main.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "public")
    }
}