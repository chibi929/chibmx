const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
MODE = process.env.MODE || 'production';
module.exports = [
  {
    mode: MODE,
    entry: './src/app/main.ts',
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          // 拡張子 .ts の場合
          test: /\.ts$/,
          // TypeScript をコンパイルする
          use: 'ts-loader'
        }
      ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
      extensions: ['.ts']
    }
  },
  {
    mode: MODE,
    entry: './src/styles/styles.scss',
    output: {
      path: `${__dirname}/dist`
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'sass-loader?outputStyle=expanded' }
          ]
        }
      ]
    },
    plugins: [
      // cssの出力先を指定する
      new MiniCssExtractPlugin({ filename: 'bundle.css' })
    ],
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})]
    }
  }
];
