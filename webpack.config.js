module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: `${__dirname}/dist`
  },
  ​
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      }
    }]
  }
};