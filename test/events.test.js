import $ from '../src/index'
import {expect} from 'chai'
import {beforeEach} from './helper'

describe('Events', function () {
  this.beforeEach(beforeEach)

  it('On Event', function () {

    let index = 0
    const $dom = $('.rDOM')
    // on绑定后 还是原来的实例
    expect($dom.on('click', function () {
      index++
    })).to.be.equal($dom)

    $('.rDOM')[0].click()
    expect(index).to.be.equal(1)
    $('.rDOM')[0].click()
    expect(index).to.be.equal(2)

    $('.rDOM').on('click', function () {
      index++
    })
    $('.rDOM')[0].click()
    expect(index).to.be.equal(4)

    $('div').on('click', function () {
      index++
    })
    $('.rDOM')[0].click()
    // TODO: 事件冒泡处理 
    // expect(index).to.be.equal(6)
  })

  it('Off Event', function () {
    let index = 0
    const cb = () => index++
    const $dom = $('.rDOM')
    $dom.on('click', cb)
    $dom[0].click()
    expect(index).to.be.equal(1)
    $dom.off('click')
    $dom[0].click()
    expect(index).to.be.equal(1)
    $dom.on('click', cb)
    $dom.on('click', () => index = index + 2)
    $dom[0].click()
    expect(index).to.be.equal(4)
    $dom.off('click', cb)
    $dom[0].click()
    expect(index).to.be.equal(6)
  })
})
