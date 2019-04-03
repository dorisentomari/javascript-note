import {betterRequire} from "./utils/common";
import {resolve} from 'path';
// 命令行主命令流程控制
let apply = (action, ...args) => {
  betterRequire(resolve(__dirname, `./${action}`))(...args);
};

export default apply;
