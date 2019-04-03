// 管理 .packclirc 文件，在当前用户目录下
import {get, set, remove, getAll} from "./utils/rc";


// pack-cli config set key value
let config = async (action, key, value) => {
  switch (action) {
    case 'get':
      if (key) {
        key = await get(key);
        console.log(key);
      } else {
        let obj = await getAll();
        Object.keys(obj).forEach(k => {
          console.log(`${k}=${obj[k]}`);
        });
      }
      break;
    case 'set':
      set(key, value);
      break;
    case 'remove':
      if (key) {
        remove(key);
      } else {
        console.log('please choose key you need remove');
      }
  }

};

export default config;
