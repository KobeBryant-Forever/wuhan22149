/**
 * 生成指定区间的随机数
 * @param {Number} min 开始数字
 * @param {Number} max 结束数字
 * @param {Boolean} hasEnd 是否包含结束true包含
 */
function makeRandomNumber(min, max, hasEnd = true) {
    if (hasEnd) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 获取元素的dom对象
 * @param {String} selector 选择器
 * @param {Boolean} isMore 是否匹配多个元素 true 表示多个  使用了默认参数  默认参数就是不传递直接使用所设置的值
 */
function $$(selector, isMore = false) {
    if (isMore) {
        return document.querySelectorAll(selector);
    }
    return document.querySelector(selector)
}

/**
 * 获取元素的样式
 * @param {Document} dom 获取元素的dom对象
 * @param {String} attrName 样式名称
 * @returns 
 */
function getStyle(dom, attrName) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(dom)[attrName];
    }
    return dom.currentStyle[attrName]
}
/**
 * 事件监听的方式绑定事件
 * @param {Document} dom 事件源的dom对象
 * @param {String} eventName 事件名称 传递没有on前缀的名称
 * @param {Function} handler 事件处理程序
 */
function linstenEvent(dom, eventName, handler) {
    // 先执行try中代码 如果执行出错自动自动catch中代码
    try {
        dom.addEventListener(eventName, handler);
    } catch (error) {
        dom.attachEvent('on' + eventName, handler);
    }
}
/**
 * 深拷贝
 * @param {Array|Object} data 拷贝的数据
 * @returns 
 */
function deepCopy(data) {
    // 验证数据类型 传递的参数需要是数组或者对象
    let allowType = ['[object Array]', '[object Object]'];
    // 提取当前数据的类型
    let dataType = Object.prototype.toString.call(data);
    // 验证是否满足要求的类型
    if (!allowType.includes(dataType)){
        throw new Error('参数类型错误');
    }
    // result变量是用于保存结果 根据现在的数据类型创建新的数组或者对象
    let result = (dataType == '[object Array]') ? [] : {};
    // 数组也是对象 也可以使用for in遍历
    for (let key in data) {
        if (allowType.includes(Object.prototype.toString.call(data[key]))) {
            result[key] = deepCopy(data[key]);
        } else {
            result[key] = data[key];
        }
    }
    return result;
}