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

  it('filter', function () {
    expect($('div').filter(() => false)).to.be.length(0)
    expect($('div').filter(() => true)).to.be.length(3)
    const $filter = $('div').filter(elem => elem.className === 'rDOM')
    expect($filter).to.be.length(1)
    expect($filter[0].className).to.equal('rDOM')

    // console.log($div.filter())
  })
})