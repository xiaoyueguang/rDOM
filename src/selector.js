/**
 * 选择器
 */
class Selector {
  constructor (query) {
    // 元素
    if (query.nodeType === 1) {
      this[0] = query
      this._collections = [query]
      this.length = 1
    } else {
      this._selectors = query
      const elems = document.querySelectorAll(query)
      Array.from(elems).forEach((elem, index) => this[index] = elem)
      this._collections = elems
      this.length = elems.length
    }
  }
}

export default Selector
