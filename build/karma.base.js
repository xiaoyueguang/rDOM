var webpackConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: '#inline-source-map'
}

// shared config for all unit tests
module.exports = {
  basePath: '',
  frameworks: ['mocha'],
  files: [
    '../test/**/*.test.js'
  ],
  preprocessors: {
    '../test/**/*.test.js': ['webpack', 'sourcemap']
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    noInfo: true
  },
  plugins: [
    'karma-mocha',
    'karma-mocha-reporter',
    'karma-sourcemap-loader',
    'karma-webpack'
  ]
}