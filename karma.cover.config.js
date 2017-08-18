const base = require('./karma.base')

module.exports = function (config) {
  const options = Object.assign(base, {
    browsers: ['PhantomJS'],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: './coverage', subdir: '.' },
        { type: 'text-summary', dir: './coverage', subdir: '.' }
      ]
    },
    singleRun: true,
    plugins: base.plugins.concat([
      'karma-coverage',
      'karma-phantomjs-launcher'
    ])
  })

  options.webpack.module.rules[0].options = {
    plugins: [['istanbul', {
      exclude: [
        'test/'
      ]
    }]]
  }

  config.set(options)

}