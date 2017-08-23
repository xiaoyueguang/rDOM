import {normalizeToBreak, normalizeToCamel} from './helper'

const getComputedStyle = window.getComputedStyle

// 需要单位的属性
export const needUnit = [
  'width',
  'height',
  'font-size'
]

export function css (key, value = undefined) {
  if (!this[0]) return
  const length = arguments.length
  if (length === 1 && typeof key === 'string') {
    const normalizeAttr = normalizeToCamel(key)
    const styles = getComputedStyle(this[0])
    return styles[normalizeAttr]
  } else if (length === 1 && typeof key === 'object') {
    this.map(elem => {
      for (let k in key) {
        elem.style[normalizeToCamel(k)] = setCorrectValue(k, key[k])
      }
    })
  } else if (length === 2) {
    this.map(elem => {
      elem.style[key] = setCorrectValue(key, value)
    })
  }
  return this
}

function setCorrectValue (key, value) {
  key = normalizeToBreak(key)
  if (needUnit.includes(key) && typeof value === 'number') {
    return `${value}px`
  } else {
    return value
  }
}