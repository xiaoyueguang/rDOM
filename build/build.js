let rollup = require('rollup')

const banner = `/**
* rDOM. a JavaScript library for DOM operations
* Released under the MIT license
*/`

const config = {
 entry: './src/index.js',
 format: 'iife',
 moduleName: 'rDOM',
 dest: './dist/rDOM.js',
 banner
}

rollup.rollup(config).then(({write}) => {
  write(config)

  rollup.rollup(config).then(({write}) => {
    write({
      format: 'es',
      dest: './dist/rDOM.es.js'
    })
  })
})
