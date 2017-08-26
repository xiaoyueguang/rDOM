import $ from '../src/index.js'

import {expect} from 'chai'


describe('Animate: ', function () {
  this.timeout(100000)
  const div = document.createElement('div')
  
  this.beforeEach(function () {
    div.className = 'div'
    div.style.width = '100px'
    div.style.height = '100px'
    div.style.background = 'red'
    document.body.appendChild(div)
  })

  this.afterEach(function () {
    document.body.removeChild(div)
  })

  // it('width', function (next) {
    // const $div = $('.div')
    // $div.animate({
    //   width: '300px'
    // })
    // setTimeout(() => {
    //   next()
    // }, 50000)
  // })
})
