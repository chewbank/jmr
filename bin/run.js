'use strict';

const assert = require('./assert.js');
const consoln = require('./console.js');

module.exports = async function (fullPath, queue) {

   console.log(`\n\x1b[34m${fullPath}\x1b[30m`);
   
   for (const item of queue) {

      const { name, func } = item;

      console.log(`\n \x1b[32m» ${name}\x1b[30m`);

      const timestamp = Date.now();

      const stateAssert = Object.create(assert);

      stateAssert.state = false;

      if (func.constructor.name === 'AsyncFunction') {

         await func(stateAssert).then(data => {

            if (stateAssert.state === true) {

               consoln.success(name, timestamp);

            } else {

               consoln.error(name, timestamp, '未执行断言');

            }

         }).catch(e => {

            consoln.error(name, timestamp, e.stack);

         })

      } else {

         try {

            func(stateAssert);

            if (stateAssert.state === true) {

               consoln.success(name, timestamp)

            } else {

               consoln.error(name, timestamp, '未执行断言');

            }

         } catch (e) {

            consoln.error(name, timestamp, e.stack);

         }

      }

   }

}