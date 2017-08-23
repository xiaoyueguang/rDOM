import * as DOMClass from './class'

import * as collection from './collection'
import {setCollection} from './collection'
import * as classActions from './class'
import * as styles from './styles'

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
      this._collections = elems
      setCollection(this, elems)
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
$.extend(classActions)
$.extend(styles)

export default function rDOM (selector) {
  return new $.init(selector)
}
rDOM.rDOM = $

window.$ = rDOM