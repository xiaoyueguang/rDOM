import * as DOMClass from './class'

import * as collection from './collection'
import * as classActions from './class'
import * as styles from './styles'
import * as events from './events'
import * as nodes from './nodes'
import {uuid} from './helper'
import {query} from './query'

function init (selector, context = document) {
  this.query(selector, context)
}

const $ = {
  // 全局唯一
  uuid,

  init,
  query,
  // 扩展
  extend (obj) {
    for (let key in obj) {
      $[key] = obj[key]
    }
  }
}

$.init.prototype = $

$.extend(collection)
$.extend(classActions)
$.extend(styles)
$.extend(events)
$.extend(nodes)

export default function simpleDomQuery (selector) {
  return new $.init(selector)
}
simpleDomQuery.uuid = uuid
simpleDomQuery.simpleDomQuery = $

window.$ = simpleDomQuery