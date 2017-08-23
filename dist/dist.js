/**
 * rDOM. a JavaScript library for DOM operations
 * Released under the MIT license
 */
'use strict';

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
  Array.from(collection).forEach((elem, index) => {
    context[index] = elem;
  });
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

var styles = Object.freeze({
	needUnit: needUnit,
	css: css
});

const $ = {
  addClass () {

  },
  init (selector) {
    this.query(selector);
  },
  /**
   * 查找
   * @param {string} selector 
   */
  query (selector) {
    // 元素
    if (selector.nodeType === 1) {
      this[0] = selector;
      this._collections = [selector];
      this.length = 1;
    } else {
      this._selectors = selector;
      const elems = document.querySelectorAll(selector);
      this._collections = elems;
      setCollection(this, elems);
    }
  },
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

function rDOM (selector) {
  return new $.init(selector)
}
rDOM.rDOM = $;

window.$ = rDOM;

module.exports = rDOM;
