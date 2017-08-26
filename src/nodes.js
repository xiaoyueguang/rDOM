/**
 * 节点操作
 */
import {setCollection} from './collection'
import $ from './index'

/**
 * 设置或获取文字
 * @param {string|undefined} text 替换的字符串或空
 * @return {$|string} 返回的字符串或集合
 */
export function text (text) {
  return replaceNodes.call(this, 'innerText', text)
}

/**
 * 设置或获取节点
 * @param {string|undefined} html 替换的节点或空
 * @return {$|string} 返回的节点或集合
 */
export function html (html) {
  return replaceNodes.call(this, 'innerHTML', html)
}

/**
 * 创建节点
 */
export function create (html) {
  const div = document.createElement('div')
  div.innerHTML = html
  const $dom = $(div)
  setCollection($dom, div.children)
  return $dom
}

/**
 * 根据传入的类型和内容 替换节点
 * @param {string} type 类型
 * @param {string} content 传入的内容
 * @return {$|string} 返回的集合或内容
 */
function replaceNodes (type, content) {
  let contents = ''
  this.map(elem => {
    if (content) {
      elem.innerHTML = content
    } else {
      contents += elem[type]
    }
  })

  return content ? this : contents
}