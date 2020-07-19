'use strict';

const fs = require('fs');
const path = require('path');
const queue = require('./queue.js');

module.exports = async function loader(fullPath, container) {

  try {

    require(fullPath);

  } catch (error) {

    // if (error.code === 'MODULE_NOT_FOUND') {
    //   throw error;
    // }
    
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {

      const dirList = fs.readdirSync(fullPath);

      for (const item of dirList) {

        container.before.splice(0);
        container.default.splice(0);
        container.after.splice(0);
        container.skip.splice(0);

        const itemPath = path.join(fullPath, item);

        await loader(itemPath, container);

      }
      
    } else {

      throw new Error(`模块路径无效`);

    }

    return;

  }

  await queue(fullPath, container);

}