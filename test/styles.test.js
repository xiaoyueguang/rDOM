import $ from '../src/index.js'

import {expect} from 'chai'
import {beforeEach, afterEach} from './helper'

describe('Styles: ', function () {
  this.beforeEach(beforeEach)
  this.afterEach(afterEach)

  it('get CSS', function () {
    expect($('p').css('width')).to.be.a('undefined')
    expect($('div').css('fontSize')).to.match(/[0-9]*px/)
    expect($('div').css('fontSize')).to.be.equal($('div').css('font-size'))
    expect($('div').css('display')).to.be.equal('block')
  })

  it('set CSS', function () {
    const $div = $('div')
    $div.css('color', 'red')
    expect($div.css('color')).to.be.equal('rgb(255, 0, 0)')
    // 判断返回的是否还是原来的实例
    expect($div.css('font-size', 32)).to.be.equal($div)
    expect($div.css('fontSize')).to.be.equal('32px')
    $div.css('fontSize', 24)
    expect($div.css('fontSize')).to.be.equal('24px')
  })

  it('set CSS by object', function () {
    const $div = $('div')
    const cssObject = {
      fontSize: 20,
      color: 'black'
    }
    // 判断返回的是否还是原来的实例
    expect($div.css(cssObject)).to.be.equal($div)
    expect($div.css('font-size')).to.be.equal('20px')
    expect($div.css('color')).to.be.equal('rgb(0, 0, 0)') 
  })
})