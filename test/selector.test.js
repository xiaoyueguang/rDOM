import $ from '../src/index.js'
import Selector from '../src/selector'
import {expect} from 'chai'
import {beforeEach} from './helper'

describe('Selector: ', function () {
  this.beforeEach(beforeEach)

  it('Instance', function () {
    const elem = $('div')
    expect(elem).to.instanceof(Selector)
    // expect(elem.length).to.equal(3)
  })

  it('#id', function () {
    const elem = $('#div')
    expect(elem.length).to.equal(1)
  })

  it('.class', function () {
    const elem = $('.rDOM')
    expect(elem.length).to.equal(2)
  })

  it('element', function () {
    const elem = $('div')
    expect(elem.length).to.equal(3)
  })

  it('element, element', function () {
    const elem = $('.rDOM, [rDOM]')
    expect(elem.length).to.equal(3)
  })

  it('element element', function () {
    const elem = $('#div [rDOM]')
    expect(elem.length).to.equal(1)
  })

  it('element+element', function () {
    const elem = $('div+span')
    expect(elem.length).to.equal(1)
  })

  it('element>element', function () {
    const elem = $('#div > .rDOM')
    expect(elem.length).to.equal(2)
  })

  it('[attr]', function () {
    const elem = $('[rDOM]')
    expect(elem.length).to.equal(1)
    const elem1 = $('[rDOM="1"]')
    expect(elem1.length).to.equal(1)
  })
});

