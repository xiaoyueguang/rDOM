/**
 * 选择第几个元素
 * @param {number} index 序号. 负数表示从后往前
 */
export function eq (index) {
  const length = this._collections.length
  return new this.init(this._collections[index > 0 ? index : length + index])
}

export function map (callback = () => {}) {
  Array.prototype.map.call(this._collections, callback)
  return this
}
/**
 * 过滤回调
 * @param {function} callback 
 */
export function filter (callback) {
  const newCollections = Array.prototype.filter.call(this._collections, callback)
  setCollection(this, newCollections)
  return this
}

/**
 * 清空 DOM 节点
 * @param {$} context 上下文
 */
export function clearCollection (context) {
  let num = 0
  context.length = 0
  context._collections = []
  while (context[num]) {
    delete context[num]
    num++
  }
}
/**
 * 在当前实例上 添加集合
 * @param {$} context 当前上下文
 * @param {collection} collection  集合
 */
export function setCollection (context, collection) {
  clearCollection(context)
  context._collections = collection
  context.length = collection.length
  Array.from(collection).forEach((elem, index) => {
    context[index] = elem
  })
}
