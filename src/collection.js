import Selector from './selector'
// 返回集合长度
export function length () {
  return this._collections.length
}
/**
 * 选择第几个元素
 * @param {number} index 序号. 负数表示从后往前
 */
export function eq (index) {
  const length = this._collections.length
  return new Selector(this._collections[index > 0 ? index : length + index])
}

export function forEach (arr, callback) {
  Array.prototype.forEach.call(arr, callback)
  return arr
}