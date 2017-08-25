let rollup = require('rollup')

const banner = `/**
* simple-dom-query. a JavaScript library for DOM operations
* Released under the MIT license
*/`

const input = {input: './src/index.js'}
const output = ({name, format}) => {
  return {
    banner,
    file: `./dist/${name}.js`,
    format,
    name
  }
}
async function exec () {
  let {write} = await rollup.rollup(input)
  write(output({
    name: 'simpleDomQuery.esm',
    format: 'es'
  }))
  write(output({
    name: 'simpleDomQuery',
    format: 'iife'
  }))
}
exec()
