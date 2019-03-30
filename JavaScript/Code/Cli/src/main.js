import program from 'commander';
import {VERSION} from "./utils/constants";
import apply from './index';

let actionMap = {
  install: {
    alias: 'i',
    description: 'install template',
    examples: [
      'pack-cli i',
      'pack-cli install'
    ]
  },
  config: {
    alias: 'c',
    description: 'config .packclirc',
    examples: [
      'pack-cli config set <key> <value>',
      'pack-cli config get <key>',
      'pack-cli config remove <key>'
    ]
  },
  '*': {
    description: 'not found',
    examples: []
  }
};

Object.keys(actionMap).forEach(action => {
  program.command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      // 判断当前用的是什么操作
      if (action === 'config') {
        // 可以更改配置文件
        apply(action, ...process.argv.slice(3));
      } else if (action === 'install') {
        apply(action);
      }
    });
});

program.on('-h', help);
program.on('--help', help);

function help() {
  console.log('\r\n how to use command');
  Object.keys(actionMap).forEach(action => {
    actionMap[action].examples.forEach(example => {
      console.log('  - ' + example);
    });
  });
}


program.version(VERSION, '-v --version').parse(process.argv);
