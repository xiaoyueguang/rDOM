import $ from '../src/index'
import {expect} from 'chai'
import {beforeEach, afterEach} from './helper'

describe('Class', function () {
  this.beforeEach(beforeEach)
  this.afterEach(afterEach)

  it('hasClass', function () {
    expect($('.simple-dom-query').hasClass('simple-dom-query')).to.be.true
    expect($('.simple-dom-query').hasClass('simple-dom-query1')).to.be.false
    expect($('div').hasClass('simple-dom-query')).to.be.true
    expect($('div').hasClass('simple-dom-query1')).to.be.false
  })

  it('addClass', function () {
    expect($('.simple-dom-query').hasClass('simple-dom-query1')).to.be.false
    // 返回的还是原先的实例
    expect($('.simple-dom-query').addClass('simple-dom-query1')).to.instanceOf($.simpleDomQuery.init)
    $('.simple-dom-query').addClass('simple-dom-query1')
    expect($('.simple-dom-query').hasClass('simple-dom-query1')).to.be.true
  })

  it('removeClass', function () {
    $('.simple-dom-query').addClass('simple-dom-query1')
    expect($('.simple-dom-query').hasClass('simple-dom-query1')).to.be.true
    // 返回的还是原先的实例
    expect($('.simple-dom-query').removeClass('simple-dom-query1')).to.instanceOf($.simpleDomQuery.init)
    $('.simple-dom-query').removeClass('simple-dom-query1')
    expect($('.simple-dom-query').hasClass('simple-dom-query1')).to.be.false
  })

  it('toggleClass', function () {
    const $div = $('div')
    // 判断某个类
    expect($div.eq(0).hasClass('simple-dom-query1')).to.be.false
    expect($div.eq(1).hasClass('simple-dom-query1')).to.be.false
    $('.simple-dom-query').addClass('simple-dom-query1')
    // 给其中个 DOM 添加类继续判断
    expect($div.eq(0).hasClass('simple-dom-query1')).to.be.false
    expect($div.eq(1).hasClass('simple-dom-query1')).to.be.true
    expect($div.toggleClass('simple-dom-query1')).to.instanceOf($.simpleDomQuery.init)
    // 切换后的判断
    expect($div.eq(0).hasClass('simple-dom-query1')).to.be.true
    expect($div.eq(1).hasClass('simple-dom-query1')).to.be.false
    $div.toggleClass('simple-dom-query1')
    // 第二次切换的判断
    expect($div.eq(0).hasClass('simple-dom-query1')).to.be.false
    expect($div.eq(1).hasClass('simple-dom-query1')).to.be.true
  })
})
