import {setCollection} from './collection'

/**
 * 查找
 * @param {string} selector 选择器
 * @param {HTMLElement} context 上下文
 */
export function query (selector, context) {
  if (selector[0] === '<') {
    const div = document.createElement('div')
    div.innerHTML = selector
    setCollection(this, div.children)
  } else {
    // 元素
    if (selector.nodeType === 1) {
      this[0] = selector
      this._collections = [selector]
      this.length = 1
    } else {
      this._selectors = selector
      const elems = context.querySelectorAll(selector)
      this._collections = elems
      setCollection(this, elems)
    }
  }
}
