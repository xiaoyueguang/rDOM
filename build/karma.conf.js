var base = require('./karma.base.js')

module.exports = function (config) {
  config.set(Object.assign(base, {
    browsers: ['Chrome'],
    reporters: ['progress'],
    autoWatch: true,
    concurrency: Infinity,
    plugins: base.plugins.concat([
      'karma-chrome-launcher'
    ]),
    // singleRun: true,
    logLevel: config.LOG_INFO
  }))
}