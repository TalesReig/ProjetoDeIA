const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  // O ponto de entrada da aplicação
  entry: {
    index: path.resolve(__dirname, 'src/views', 'index.ts')
  },

  // Configuração de output do build
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }      
    ]
  },

  // aliases
  resolve: {
    extensions: ['.ts', '.js', '.css'],

    alias: {
      assets: path.resolve(__dirname, 'src/assets')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views', 'index.html'),
      chunks: ['index']
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]
    })
  ],

  // Ambiente de desenvolvimento
  devtool: 'source-map',
  
  devServer: {
    liveReload: true,
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    watchFiles: {
      paths: ['src']
    }
  }
};