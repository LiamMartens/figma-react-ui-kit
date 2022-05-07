const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    style: path.resolve(__dirname, 'src/scss/style/style.scss'),
    index: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    ...(isProduction && ({
      library: 'FigmaUIKit',
      libraryTarget: 'umd'
    }))
  },
  ...(isProduction && ({
    externals: ['react', 'react-dom', 'react-portal'],
  })),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
              sourceMap: false,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: fs.readdirSync(path.join(__dirname, 'src/scss/resources')).map(file => (
                path.join(__dirname, 'src/scss/resources', file)
              ))
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss']
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ],
};