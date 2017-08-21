import $ from '../src/index'
import {expect} from 'chai'
import {beforeEach} from './helper'
import {
  length,
  eq
} from '../src/collection'

describe('Collection', function () {
  this.beforeEach(beforeEach)

  it('length', function () {
    expect(length.call($('div'))).to.be.equal(3)
  })

  it('eq', function () {
    const div = eq.call($('div'), 1)
    expect(div.length).to.be.equal(1)
    expect(div[0].className).to.be.equal('rDOM')
  })

  it('eq minus index', function () {
    const div = eq.call($('div'), -2)
    expect(div.length).to.be.equal(1)
    expect(div[0].className).to.be.equal('rDOM')
    expect(div[0]).to.be.equal(eq.call($('div'), 1)[0])
  })

  it('forEach', function () {

  })
})