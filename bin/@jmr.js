'use strict';

/**
 * 仅作为容器使用，搜集并保存测试函数
 */

const container = {
   before: [],
   default: [],
   after: [],
   skip: [],
};

/**
 * 
 * @param {String} name 测试名
 * @param {Function} func 测试方法
 */
function test(name, func) {
   container.default.push({ name, func });
}

/**
 * 跳过执行
 * @param {String} name 测试名
 * @param {Function} func 测试方法
 */
test.skip = function (name, func) {
   container.skip.push({ name, func });
}

/**
 * 前置钩子
 * @param {String} name 测试名
 * @param {Function} func 测试方法
 */
test.before = function (name, func) {
   container.before.push({ name, func });
}

/**
 * 后置钩子
 * @param {String} name 测试名
 * @param {Function} func 测试方法
 */
test.after = function (name, func) {
   container.after.push({ name, func });
}

/**
 * 初始化容器
 */
test.init = function () {
   container.before.splice(0);
   container.default.splice(0);
   container.after.splice(0);
   container.skip.splice(0);
}

test.container = container;

test.version = "0.0.7";

module.exports = test;
