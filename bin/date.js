'use strict';

/**
 * 获取当前本地格式化时间
 */

module.exports = function getDate() {

  const nowDate = new Date()

  const hours = nowDate.getHours();

  const minutes = nowDate.getMinutes();

  const seconds = nowDate.getSeconds();

  return `${hours}:${minutes}:${seconds}`;

};
