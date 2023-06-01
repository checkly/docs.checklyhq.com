import webpack from 'webpack'
import path from 'path'

export default {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[contenthash:7].[ext]'
        }
      },
      {
        test: /\.(s*)css$/,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.((woff)|(woff2)|(ttf))(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.((png)|(eot)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/[contenthash:7].[ext]'
      },
      {
        test: /\.json$/, loader: 'json-loader'
      },
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: true }
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ],

  context: path.join(__dirname, 'src'),
  entry: {
    index: ['./js/index'],
    docs: ['./js/docs'],
    learn: ['./js/learn'],
    cliCopyButton: ['./js/cliCopyButton']
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/',
    filename: '[name].js'
  },
  externals: [/^vendor\/.+\.js$/]
}
