/**
* simple-dom-query. a JavaScript library for DOM operations
* Released under the MIT license
*/
/**
 * 类操作
 */

/**
 * 添加类
 * @param {string} 类名
 * @return {$} 本身实例 实现链式调用
 */
function addClass (className) {
  this.map(elem => {
    elemAddClass(elem, className);
  });
  return this
}

/**
 * 删除类
 * @param {string} 类名
 * @return {$} 本身实例 实现链式调用
 */
function removeClass (className) {
  this.map(elem => {
    elemRemoveClass(elem, className);
  });
  return this
}

/**
 * 切换类
 * @param {string} 类名
 * @return {$} 本身实例 实现链式调用
 */
function toggleClass (className) {
  this.map(elem => {
    if (isElemHasClass(elem, className)) {
      elemRemoveClass(elem, className);
    } else {
      elemAddClass(elem, className);
    }
  });
  return this
}

/**
 * 判断 DOM 中是否存在类名
 * @param {string} className 类名
 * @return {boolean}
 */
function hasClass (className) {
  return isElemsHasClass(this, className)
}
/**
 * 判断当前节点集合中是否含有该类
 * @param {$} context 实例
 * @param {string} className 类名
 */
function isElemsHasClass (context, className) {
  let result = false;
  context.map(elem => {
    if (elem.className.split(' ').includes(className)) {
      result = true;
    }
  });
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
    elem.className = elem.className + ' ' + className;
  }
}
/**
 * 单个节点 删除类名
 * @param {HTMLElement} elem 节点
 * @param {string} className 类名
 */
function elemRemoveClass (elem, className) {
  if (isElemHasClass(elem, className)) {
    const currentClassNameArr = elem.className.split(' ');
    const filterClassNameArr = currentClassNameArr.filter(scopedClassName => scopedClassName !== className);
    elem.className = filterClassNameArr.join(' ');
  }
}

var classActions = Object.freeze({
	addClass: addClass,
	removeClass: removeClass,
	toggleClass: toggleClass,
	hasClass: hasClass
});

/**
 * 选择第几个元素
 * @param {number} index 序号. 负数表示从后往前
 */
function eq (index) {
  const length = this._collections.length;
  return new this.init(this._collections[index >= 0 ? index : length + index])
}

function map (callback) {
  Array.prototype.map.call(this._collections, callback);
  return this
}
/**
 * 过滤回调
 * @param {function} callback
 */
function filter (callback) {
  const newCollections = Array.prototype.filter.call(this._collections, callback);
  setCollection(this, newCollections);
  return this
}

/**
 * 清空 DOM 节点
 * @param {$} context 上下文
 */
function clearCollection (context) {
  let num = 0;
  context.length = 0;
  context._collections = [];
  while (context[num]) {
    delete context[num];
    num++;
  }
}
/**
 * 在当前实例上 添加集合
 * @param {$} context 当前上下文
 * @param {collection} collection  集合
 */
function setCollection (context, collection) {
  clearCollection(context);
  context._collections = collection;
  context.length = collection.length;
  let i = 0;
  // for 的性能比 forEach 和 map 要快了一倍...
  for (; i < context.length; i++) {
    context[i] = collection[i];
  }

}


var collection = Object.freeze({
	eq: eq,
	map: map,
	filter: filter,
	clearCollection: clearCollection,
	setCollection: setCollection
});

/**
 * 将字符串转为破折连接形式
 * @param {string} str 
 * @return {string}
 */
const normalizeToBreak = str => str.replace(/[A-Z]/g, data => `-${data.toLowerCase()}`);

/**
 * 将字符串转为驼峰形式
 * @param {string} str 
 * @return {string}
 */
const normalizeToCamel = str => str.replace(/\-[a-z]/g, data => data.substr(1).toUpperCase());

const generateUuid = () => Math.random().toString().substr(2);

const uuid = `simple-dom-query${generateUuid()}`;

const getComputedStyle = window.getComputedStyle;

// 需要单位的属性
const needUnit = [
  'width',
  'height',
  'font-size'
];
/**
 * 获取或设置样式
 * 根据参数长度来确定方法
 * @param {string|object} key 获取对应属性的值, 或设置样式的对象
 * @param {string|number} value 设置属性的值
 * @return {$|string} 返回值或当前对象
 */
function css (key, value = undefined) {
  // 当前没 DOM 就直接返回
  if (!this[0]) return
  // 获取参数长度
  const length = arguments.length;
  if (length === 1 && typeof key === 'string') {
    // 当长度为1 且第一个类型为字符串时. 为获取样式对应属性的值
    const normalizeAttr = normalizeToCamel(key);
    const styles = getComputedStyle(this[0]);
    return styles[normalizeAttr]
  }

  if (length === 1 && typeof key === 'object') {
    // 当长度为1 且第一个类型为对象时, 设置当前 DOM 的样式
    this.map(elem => {
      for (let k in key) {
        elem.style[normalizeToCamel(k)] = setCorrectValue(k, key[k]);
      }
    });
  }

  if (length === 2) {
    // 当长度为2时, 设置当前样式
    this.map(elem => {
      elem.style[key] = setCorrectValue(key, value);
    });
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
  key = normalizeToBreak(key);
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

var styles = Object.freeze({
	needUnit: needUnit,
	css: css
});

/**
 * 事件处理.
 * 将事件保存到 DOM 的某个唯一属性下.
 * 监听则将方法传入到 DOM 下, 方便移除的时候直接从这里取到函数引用.
 */

/**
 * 绑定事件
 * @param {string} eventName 事件名
 * @param {function} cb 回调
 * @return {$} 自身实例 实现链式调用
 */
function on (eventName, cb) {
  this.map(elem => {
    elem[`on${eventName}`] = event => {
      eventHandler(elem, eventName, this.uuid, event);
      event.stopPropagation();
    };
    addEventFn(elem, eventName, this.uuid, cb);
  });
  return this
}
/**
 * 按照参数 来取消回调
 * @param {string} eventName 事件名
 * @param {function} cb 回调
 * @return {$} 自身实例 实现链式调用
 */
function off (eventName, cb) {
  const isOffAll = arguments.length === 1;
  const uuid = this.uuid;
  this.map(elem => {
    const events = getEvents(elem, eventName, uuid);
    if (events) {
      if (isOffAll) {
        while(events.length > 1) {
          events.pop();
        }
      }
      const index = events.indexOf(cb);
      events.splice(index, 1);
    }
  });
  return this
}

/**
 * 绑定事件, 仅触发一次
 * @param {string} eventName 事件名
 * @param {function} cb 回调
 * @return {$} 自身实例 实现链式调用
 */
function once (eventName, cb) {
  const uuid = this.uuid;
  const context = this;
  function newCb (event) {
    cb.call(this, event);
    context.off(eventName, cb);
  }
  return this.on(eventName, newCb)
}

/**
 * 触发事件
 * @param {string} eventName 事件名
 * @return {$} 自身实例 实现链式调用
 */
function trigger (eventName) {
  this.map(elem => elem[eventName] && elem[eventName]());
  return this
}

/**
 * 事件调用. 调用存到 节点上的事件
 * @param {HTMLElement} elem  节点
 * @param {string} eventName 事件名
 * @param {string} uuid 唯一码
 */
function eventHandler (elem, eventName, uuid, event) {
  const events = getEvents(elem, eventName, uuid);
  events.map(cb => {
    cb.call(elem, event);
  });
}

/**
 * 给节点快速添加方法
 * @param {HTMLElement} elem 节点
 * @param {string} eventName 事件名
 * @param {string} uuid 唯一码
 * @param {function} cb 回调
 */
function addEventFn (elem, eventName, uuid, cb) {
  !elem[uuid] && (elem[uuid] = {Event: {}});
  !elem[uuid].Event[eventName] && (elem[uuid].Event[eventName] = []);
  elem[uuid].Event[eventName].push(cb);
}

/**
 * 快速返回当前节点的某个事件
 * @param {HTMLElement} elem 节点
 * @param {string} eventName 事件名
 * @param {string} uuid 唯一码
 * @return {array}
 */
function getEvents (elem, eventName, uuid) {
  return elem &&
    elem[uuid] &&
    elem[uuid].Event &&
    elem[uuid].Event[eventName]
}

var events = Object.freeze({
	on: on,
	off: off,
	once: once,
	trigger: trigger
});

/**
 * 节点操作
 */
/**
 * 设置或获取文字
 * @param {string|undefined} text 替换的字符串或空
 * @return {$|string} 返回的字符串或集合
 */
function text (text) {
  return replaceNodes.call(this, 'innerText', text)
}

/**
 * 设置或获取节点
 * @param {string|undefined} html 替换的节点或空
 * @return {$|string} 返回的节点或集合
 */
function html (html) {
  return replaceNodes.call(this, 'innerHTML', html)
}

/**
 * 根据传入的类型和内容 替换节点
 * @param {string} type 类型
 * @param {string} content 传入的内容
 * @return {$|string} 返回的集合或内容
 */
function replaceNodes (type, content) {
  let contents = '';
  this.map(elem => {
    if (content) {
      elem.innerHTML = content;
    } else {
      contents += elem[type];
    }
  });

  return content ? this : contents
}

var nodes = Object.freeze({
	text: text,
	html: html
});

/**
 * 查找
 * @param {string} selector 选择器
 * @param {HTMLElement} context 上下文
 */
function query (selector, context) {
  if (selector[0] === '<') {
    const div = document.createElement('div');
    div.innerHTML = selector;
    setCollection(this, div.children);
  } else {
    // 元素
    if (selector.nodeType === 1) {
      this[0] = selector;
      this._collections = [selector];
      this.length = 1;
    } else {
      this._selectors = selector;
      const elems = context.querySelectorAll(selector);
      this._collections = elems;
      setCollection(this, elems);
    }
  }
}

function init (selector, context = document) {
  this.query(selector, context);
}

const $ = {
  // 全局唯一
  uuid,

  init,
  query,
  // 扩展
  extend (obj) {
    for (let key in obj) {
      $[key] = obj[key];
    }
  }
};

$.init.prototype = $;

$.extend(collection);
$.extend(classActions);
$.extend(styles);
$.extend(events);
$.extend(nodes);

function simpleDomQuery (selector) {
  return new $.init(selector)
}
simpleDomQuery.uuid = uuid;
simpleDomQuery.simpleDomQuery = $;

window.$ = simpleDomQuery;

export default simpleDomQuery;
