import {normalizeToBreak, normalizeToCamel} from './helper'

const getComputedStyle = window.getComputedStyle

// 需要单位的属性
export const needUnit = [
  'width',
  'height',
  'font-size'
]
/**
 * 获取或设置样式
 * 根据参数长度来确定方法
 * @param {string|object} key 获取对应属性的值, 或设置样式的对象
 * @param {string|number} value 设置属性的值
 * @return {$|string} 返回值或当前对象
 */
export function css (key, value = undefined) {
  // 当前没 DOM 就直接返回
  if (!this[0]) return
  // 获取参数长度
  const length = arguments.length
  if (length === 1 && typeof key === 'string') {
    // 当长度为1 且第一个类型为字符串时. 为获取样式对应属性的值
    const normalizeAttr = normalizeToCamel(key)
    const styles = getComputedStyle(this[0])
    return styles[normalizeAttr]
  }

  if (length === 1 && typeof key === 'object') {
    // 当长度为1 且第一个类型为对象时, 设置当前 DOM 的样式
    this.map(elem => {
      for (let k in key) {
        elem.style[normalizeToCamel(k)] = setCorrectValue(k, key[k])
      }
    })
  }

  if (length === 2) {
    // 当长度为2时, 设置当前样式
    this.map(elem => {
      elem.style[key] = setCorrectValue(key, value)
    })
  }
  return this
}

/**
 * 设置正确的值
 * @param {string} key 传入的属性
 * @param {string|number} value 传入的值
 * @param {string} 返回正确的值.
 */
function setCorrectValue (key, value) {
  key = normalizeToBreak(key)
  if (needUnit.includes(key) && typeof value === 'number') {
    return `${value}px`
  } else {
    return value
  }
}

/**
 * 执行动画
 * @param {object} styleObject 样式对象
 * @param {number} speed 速度
 * @param {string} easing 效果
 * @param {function} fn 回调
 */
// export function animate (styleObject = {}, speed = 400, easing = 'linear', fn = () => {}) {
//   this.css('transition', `all ${speed}ms ${easing}`)
//   this.css(styleObject)
//   this.once('transitionend', function () {
//     fn.call(this)
//     this.css('transition', '')
//   })
// }