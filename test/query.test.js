import $ from '../src/index.js'

import {expect} from 'chai'
import {beforeEach, afterEach} from './helper'

describe('Selector: ', function () {
  this.beforeEach(beforeEach)
  this.afterEach(afterEach)

  it('Instance', function () {
    const elem = $('div')
    expect(elem).to.instanceof($.simpleDomQuery.init)
  })

  it('elem', function () {
    const elem = $('div')
    const div = $(elem[0])
    expect(elem).to.instanceof($.simpleDomQuery.init)
  })

  it('#id', function () {
    const elem = $('#div')
    expect(elem.length).to.equal(1)
  })

  it('.class', function () {
    const elem = $('.simple-dom-query')
    expect(elem.length).to.equal(2)
  })

  it('element', function () {
    const elem = $('div')
    expect(elem.length).to.equal(3)
  })

  it('element, element', function () {
    const elem = $('.simple-dom-query, [simple-dom-query]')
    expect(elem.length).to.equal(3)
  })

  it('element element', function () {
    const elem = $('#div [simple-dom-query]')
    expect(elem.length).to.equal(1)
  })

  it('element+element', function () {
    const elem = $('div+span')
    expect(elem.length).to.equal(1)
  })

  it('element>element', function () {
    const elem = $('#div > .simple-dom-query')
    expect(elem.length).to.equal(2)
  })

  it('[attr]', function () {
    const elem = $('[simple-dom-query]')
    expect(elem.length).to.equal(1)
    const elem1 = $('[simple-dom-query="1"]')
    expect(elem1.length).to.equal(1)
  })

  it('find Element from elements', function () {
    expect($('[simple-dom-query]', document).length).to.be.equal(1)
  })
});

