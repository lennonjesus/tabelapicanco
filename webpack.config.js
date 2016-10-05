module.exports = {
  entry: [
    "./scripts/app.module.es6",
    "./scripts/app.config.es6",
    "./scripts/app.setup.es6",
    "./scripts/home.controller.es6",
  ],
  output: {
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'

      }
    ],
    loaders: [
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']
  },
  watch: true
};
