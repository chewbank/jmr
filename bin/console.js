'use strict';

module.exports = {
  success(name, timestamp, message = '') {

    const time = Date.now() - timestamp;

    console.log(`\n \x1b[32m√ ${name} \x1b[39m(${time}ms) ${message}\x1b[30m`);

  },
  error(name, timestamp, message = '') {

    const time = Date.now() - timestamp;

    console.log(`\n \x1b[31m× ${name} \x1b[39m(${time}ms) ${message}\x1b[30m`);

  }
}