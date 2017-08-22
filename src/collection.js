/**
 * 选择第几个元素
 * @param {number} index 序号. 负数表示从后往前
 */
export function eq (index) {
  const length = this._collections.length
  return new this.init(this._collections[index > 0 ? index : length + index])
}

export function map (callback) {
  Array.prototype.map.call(this._collections, callback)
}