# simple-dom-query
这是一个类似与`jQuery`的`DOM`操作库. 大部分功能都在操作`DOM`上, 完全基于`ES6`语法, 不转码, 争取做到小体积, 高性能!  

![](https://travis-ci.org/xiaoyueguang/simple-dom-query.svg?branch=master)


## API
# `$` 主要方法
* `$(selector)` 选择器
* `$().css(key, [value])` 样式
* `$().on(name, cb)` 绑定
* `$().off(name, [cb])` 解除绑定
* `$().once(name, cb)` 绑定 执行一次方法
* `$().trigger(name, cb)` 触发
* `$().addClass(name)` 添加类
* `$().removeClass(name)` 删除类
* `$().toggleClass(name)` 切换类
* `$().hasClass(name)` 判断是否有该类
* `$().text(string)` 获取或设置值
* `$().html(string)` 获取或设置值

### [覆盖率](https://xiaoyueguang.github.io/simple-dom-query/coverage/lcov-report/src/index.html)

### [与`jQuery`的性能比较](https://xiaoyueguang.github.io/simple-dom-query/performance/index.html)
与`jQuery`比较之后才发现. `jQuery`性能非常好. 得益于`jQuery`的缓存机制,以及高性能的`sizzle`引擎. 