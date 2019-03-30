import {version} from '../../package.json';


export const VERSION = version;

const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

export const RC = `${HOME}/.packclirc`;
// RC 是配置下载模板的地方，有什么模板

export const DEFAULTS = {
  registry: 'pack-cli',
  // type的值可能是组织或者是个人，不同的 type
  type: 'user',
};

