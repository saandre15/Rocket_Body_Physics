const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'build', 'index'),
  watch: true,
  output: {
    path: __dirname,
    publicPath: '/dist/',
    filename: "index.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      query: {
        presets: [
          ["@babel/env", {
            "targets": {
              "browsers": "last 2 chrome versions"
            }
          }]
        ]
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join('./'),
    inline: true,
    port: 8080
  }
};