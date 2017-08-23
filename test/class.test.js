import $ from '../src/index'
import {expect} from 'chai'
import {beforeEach} from './helper'

describe('Class', function () {
  this.beforeEach(beforeEach)

  it('hasClass', function () {
    expect($('.rDOM').hasClass('rDOM')).to.be.true
    expect($('.rDOM').hasClass('rDOM1')).to.be.false
    expect($('div').hasClass('rDOM')).to.be.true
    expect($('div').hasClass('rDOM1')).to.be.false
  })

  it('addClass', function () {
    expect($('.rDOM').hasClass('rDOM1')).to.be.false
    // 返回的还是原先的实例
    expect($('.rDOM').addClass('rDOM1')).to.instanceOf($.rDOM.init)
    $('.rDOM').addClass('rDOM1')
    expect($('.rDOM').hasClass('rDOM1')).to.be.true
  })

  it('removeClass', function () {
    $('.rDOM').addClass('rDOM1')
    expect($('.rDOM').hasClass('rDOM1')).to.be.true
    // 返回的还是原先的实例
    expect($('.rDOM').removeClass('rDOM1')).to.instanceOf($.rDOM.init)
    $('.rDOM').removeClass('rDOM1')
    expect($('.rDOM').hasClass('rDOM1')).to.be.false
  })

  it('toggleClass', function () {
    const $div = $('div')
    // 判断某个类
    expect($div.eq(0).hasClass('rDOM1')).to.be.false
    expect($div.eq(1).hasClass('rDOM1')).to.be.false
    $('.rDOM').addClass('rDOM1')
    // 给其中个 DOM 添加类继续判断
    expect($div.eq(0).hasClass('rDOM1')).to.be.false
    expect($div.eq(1).hasClass('rDOM1')).to.be.true
    expect($div.toggleClass('rDOM1')).to.instanceOf($.rDOM.init)
    // 切换后的判断
    expect($div.eq(0).hasClass('rDOM1')).to.be.true
    expect($div.eq(1).hasClass('rDOM1')).to.be.false
    $div.toggleClass('rDOM1')
    // 第二次切换的判断
    expect($div.eq(0).hasClass('rDOM1')).to.be.false
    expect($div.eq(1).hasClass('rDOM1')).to.be.true
  })
})
