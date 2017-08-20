/**
 * 选择器
 */
class Selector {
  constructor (query) {
    const elems = document.querySelectorAll(query)
    new Array(elems).forEach((elem, index) => this[index] = elem)
    this.length = elems.length
  }
}

export default Selector
