/**
 * 类操作
 */

/**
 * 添加类
 * @param {string} 类名
 * @return {$} 本身实例 实现链式调用
 */
export function addClass (className) {
  this.map(elem => {
    elemAddClass(elem, className)
  })
  return this
}

/**
 * 删除类
 * @param {string} 类名
 * @return {$} 本身实例 实现链式调用
 */
export function removeClass (className) {
  this.map(elem => {
    elemRemoveClass(elem, className)
  })
  return this
}

/**
 * 切换类
 * @param {string} 类名
 * @return {$} 本身实例 实现链式调用
 */
export function toggleClass (className) {
  this.map(elem => {
    if (isElemHasClass(elem, className)) {
      elemRemoveClass(elem, className)
    } else {
      elemAddClass(elem, className)
    }
  })
  return this
}

/**
 * 判断 DOM 中是否存在类名
 * @param {string} className 类名
 * @return {boolean}
 */
export function hasClass (className) {
  return isElemsHasClass(this, className)
}
/**
 * 判断当前节点集合中是否含有该类
 * @param {$} context 实例
 * @param {string} className 类名
 */
function isElemsHasClass (context, className) {
  let result = false
  context.map(elem => {
    if (elem.className.split(' ').includes(className)) {
      result = true
    }
  })
  return result
}
/**
 * 判断某个节点是否有该类名
 * @param {HTMLElement} elem 节点
 * @param {string} className 类名
 * @return {boolean}
 */
function isElemHasClass (elem, className) {
  return elem.className.split(' ').includes(className)
}
/**
 * 单个节点 添加类名
 * @param {HTMLElement} elem 节点
 * @param {string} className 类名
 */
function elemAddClass (elem, className) {
  if (!isElemHasClass(elem, className)) {
    elem.className = elem.className + ' ' + className
  }
}
/**
 * 单个节点 删除类名
 * @param {HTMLElement} elem 节点
 * @param {string} className 类名
 */
function elemRemoveClass (elem, className) {
  if (isElemHasClass(elem, className)) {
    const currentClassNameArr = elem.className.split(' ')
    const filterClassNameArr = currentClassNameArr.filter(scopedClassName => scopedClassName !== className)
    elem.className = filterClassNameArr.join(' ')
  }
}