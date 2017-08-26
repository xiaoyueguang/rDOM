import $ from '../src/index.js'
import {beforeEach, afterEach} from './helper'
import {expect} from 'chai'


describe('Node: ', function () {
  this.beforeEach(beforeEach)
  this.afterEach(afterEach)

  it('text', function () {
    const $dom = $('[simple-dom-query]')
    expect($dom.text()).to.be.equal('')
    expect($dom.text('test')).to.be.equal($dom)
    expect($dom.text()).to.be.equal('test')
  })

  it('html', function () {
    const $dom = $('[simple-dom-query]')
    $dom[0].appendChild(document.createElement('span'))
    expect($dom.html()).to.be.equal('<span></span>')
    expect($dom.html('<p>test</p>')).to.be.equal($dom)
    expect($dom.html()).to.be.equal('<p>test</p>')
  })

  it('create', function () {
    // const $dom = $('[simple-dom-query]')
    const $dom = $('<div><span></span></div>')
    expect($dom.length).to.be.equal(1)
    expect($dom.html()).to.be.equal('<span></span>')
  })

  it('remove', function () {

  })
})
