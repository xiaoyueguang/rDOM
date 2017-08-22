import * as DOMClass from './class'

import * as collection from './collection'

const $ = {
  addClass () {

  },
  init (selector) {
    this.query(selector)
  },
  /**
   * 查找
   * @param {string} selector 
   */
  query (selector) {
    // 元素
    if (selector.nodeType === 1) {
      this[0] = selector
      this._collections = [selector]
      this.length = 1
    } else {
      this._selectors = selector
      const elems = document.querySelectorAll(selector)
      Array.from(elems).forEach((elem, index) => this[index] = elem)
      this._collections = elems
      this.length = elems.length
    }
  },
  // 扩展
  extend (obj) {
    for (let key in obj) {
      $[key] = obj[key]
    }
  }
}

$.init.prototype = $

$.extend(collection)

export default function rDOM (selector) {
  return new $.init(selector)
}
rDOM.rDOM = $

window.$ = rDOM