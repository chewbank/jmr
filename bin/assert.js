'use strict';

const assert = require('assert').strict

// 断言包装器，为断言增加额外状态
const assertBox = {};

for (const name in assert) {

   assertBox[name] = function (...arvg) {

      assert[name](...arvg);
      this.state = true;
      
   }

}

module.exports = assertBox;