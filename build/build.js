let rollup = require('rollup')
let UglifyJS = require('uglify-es')
let fs = require('fs')

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
  await write(output({
    name: 'simpleDomQuery.esm',
    format: 'es'
  }))
  await write(output({
    name: 'simpleDomQuery',
    format: 'iife'
  }))

  await uglify('./dist/simpleDomQuery.esm')
  await uglify('./dist/simpleDomQuery')
}
exec()

function uglify (path) {
  return new Promise(resolve => {
    const start = new Date();
    let content = fs.readFileSync(`${path}.js`, 'utf8');
    let result = UglifyJS.minify(content);
    if (result.code) {
      fs.writeFileSync(`${path}.min.js`, result.code, 'utf8');
    }
    resolve()
  })
}