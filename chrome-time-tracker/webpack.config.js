const path = require('path');

module.exports = {
  mode: 'development', // or 'production' when you're ready to build the final version
  entry: {
    background: path.join(__dirname, 'src/background/index.js'),
    content: path.join(__dirname, 'src/content/index.js'),
    popup: path.join(__dirname, 'src/popup/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
