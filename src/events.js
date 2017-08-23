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
export function on (eventName, cb) {
  this.map(elem => {
    elem[`on${eventName}`] = (e) => {
      eventHandler(elem, eventName, this.uuid)
      e.stopPropagation()
      e.preventDefault()
    }
    addEventFn(elem, eventName, this.uuid, cb)
  })
  return this
}
/**
 * 按照参数 来取消回调
 * @param {string} eventName 事件名
 * @param {function} cb 回调
 * @return {$} 自身实例 实现链式调用
 */
export function off (eventName, cb) {
  const isOffAll = arguments.length === 1
  const uuid = this.uuid
  this.map(elem => {
    const events = getEvents(elem, eventName, uuid)
    if (events) {
      if (isOffAll) {
        while(events.length > 1) {
          events.pop()
        }
      }
      const index = events.indexOf(cb)
      events.splice(index, 1)
    }
  })
  return this
}

export function once (eventName, cb) {

}

export function trigger (eventName) {

}

/**
 * 事件调用. 调用存到 节点上的事件
 * @param {HTMLElement} elem  节点
 * @param {string} eventName 事件名
 * @param {string} uuid 唯一码
 */
function eventHandler (elem, eventName, uuid) {
  const events = getEvents(elem, eventName, uuid)
  // console.log(events)
  if (events) {
    events.map(cb => {
      cb.apply(elem)
    })
  }
}

/**
 * 给节点快速添加方法
 * @param {HTMLElement} elem 节点
 * @param {string} eventName 事件名
 * @param {string} uuid 唯一码
 * @param {function} cb 回调
 */
function addEventFn (elem, eventName, uuid, cb) {
  !elem[uuid] && (elem[uuid] = {Event: {}})
  !elem[uuid].Event && (elem[uuid].Event = {})
  !elem[uuid].Event[eventName] && (elem[uuid].Event[eventName] = [])
  elem[uuid].Event[eventName].push(cb)
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