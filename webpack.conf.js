import webpack from 'webpack'
import path from 'path'

export default {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000
          }
        },
        generator: {
          filename: 'static/img/[name].[contenthash:7][ext]'
        }
      },
      {
        test: /\.(s*)css$/,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[contenthash:7][ext]'
        }
      },
      {
        test: /\.(eot|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[contenthash:7][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: ['whatwg-fetch', 'fetch']
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
