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
    expect(index).to.be.equal(7)
  })

  // 上下文判断
  it('On Event Context and Event', function () {
    const $dom = $('.rDOM')
    $dom.on('click', function (e) {
      expect(e).to.be.instanceOf(MouseEvent)
      expect(this).to.be.equal($dom[0])
    })
    $dom[0].click()
  })

  it('Off Event: Clear an event', function () {
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
  // 清除所有事件
  it('Off Event: Clear all events', function () {
    let index = 0
    const cb = () => index++
    const $dom = $('.rDOM')
    $dom.on('click', cb)
    $dom.on('click', cb)
    $dom[0].click()
    expect(index).to.be.equal(2)
    expect($dom.off('click')).to.be.equal($dom)
    $dom[0].click()
    expect(index).to.be.equal(2)
  })

  it('Once Event', function () {
    let index = 0
    const $dom = $('.rDOM')
    expect($dom.once('click', e => index++))
      .to.be.equal($dom)
    $dom[0].click()
    expect(index).to.be.equal(1)
    $dom[0].click()
    expect(index).to.be.equal(1)
  })

  // 上下文判断
  it('Once Event Context and Event', function () {
    const $dom = $('.rDOM')
    $dom.once('click', function (e) {
      expect(e).to.be.instanceOf(MouseEvent)
      expect(this).to.be.equal($dom[0])
    })
    $dom[0].click()
  })

  it('Trigger', function () {
    let i = 0
    const $dom = $('.rDOM')
    $dom.on('click', e => {
      i++
    })
    expect($dom.trigger('click')).to.be.equal($dom)
    expect(i).to.be.equal($dom.length)
  })


})
