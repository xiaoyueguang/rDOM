import $ from '../src/index'
import {expect} from 'chai'
import {beforeEach} from './helper'

describe('Collection', function () {
  this.beforeEach(beforeEach)

  it('eq', function () {
    const $div = $('div').eq(1)
    expect($div.length).to.be.equal(1)
    expect($div[0].className).to.be.equal('rDOM')
  })

  it('eq minus index', function () {
    const $div = $('div').eq(-2)
    expect($div.length).to.be.equal(1)
    expect($div[0].className).to.be.equal('rDOM')
    expect($div[0]).to.be.equal($('div').eq(1)[0])
  })

  it('map', function () {
    const $div = $('div')
    $div.map((elem, index) => {
      expect(elem.nodeType).to.be.equal(1)
      expect(index).to.be.a('number')
      expect(index).to.most(3)
      expect(index).to.be.above(-1)
    })
  })
})