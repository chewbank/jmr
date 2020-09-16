#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const argv = require('./argv.js');
const getDate = require('./date.js');
const loader = require('./loader.js');
const run = require('./run.js');

console.log(`\n\x1b[30m»»»»»»»»»»»»»»» ${getDate()} «««««««««««««««`);

const cwd = process.cwd();
const codePath = path.join(__dirname, '@jmr.js');
const injectionPath = path.join(cwd, 'node_modules', 'jmr.js');

try {

  fs.accessSync(injectionPath);

} catch (error) {

  const code = fs.readFileSync(codePath, 'utf8');

  fs.mkdirSync(path.join(cwd, 'node_modules'), { recursive: true });

  fs.writeFileSync(injectionPath, code);

}

const { version, container, init } = require(injectionPath);

if (version !== packageJson.version) {

  const code = fs.readFileSync(codePath, 'utf8');

  fs.writeFileSync(injectionPath, code);

  throw new Error(`jmr版本与注入依赖版本不一致`);

}

try {
  require(`${cwd}/jmr.config.js`);
} catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND') {
    throw error;
  }
}

async function main() {

  if (argv.default.length === 0) {
    argv.default.push('./test/');
  }

  for (const item of argv.default) {

    const [jsPath, name] = item.split(":");

    const fullPath = path.join(cwd, jsPath);

    init(container);

    // 指定测试项名称
    if (name) {

      require(fullPath);

      if (name) {

        for (const item of container.default) {

          if (item.name === name) {
            await run(fullPath, [
              ...container.before,
              item,
              ...container.after
            ]);
            break;
          };

        }

      }

    } else {

      await loader(fullPath, container);

    }

  }

}

main();
