import {RC, DEFAULTS} from "./constants";
import {decode, encode} from 'ini';
import {promisify} from 'util';
import fs from 'fs';

let exists = promisify(fs.exists);
let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);

// RC 是配置文件， DEFAULTS 是默认配置
export let get = async (key) => {
  let has = await exists(RC);
  let options;
  if (has) {
    options = await readFile(RC, 'utf8');
    options = decode(options);
    return options[key];
  }
  return '';
};
export let set = async (key, value) => {
  let has = await exists(RC);
  let options;
  if (has) {
    options = await readFile(RC, 'utf8');
    options = decode(options);
    options = Object.assign(options, {[key]: value});
  } else {
    options = Object.assign(DEFAULTS, {[key]: value});
  }
  await writeFile(RC, encode(options), 'utf8');
};
export let remove = async (key) => {
  let has = await exists(RC);
  let options;
  if (has) {
    options = await readFile(RC, 'utf8');
    options = decode(options);
    delete options[key];
    await writeFile(RC, encode(options), 'utf8');
  } else {
    console.log('i\'s clear, nothing need remove...')
  }
};
export let getAll = async () => {
  let has = await exists(RC);
  let options;
  if (has) {
    options = await readFile(RC, 'utf8');
    options = decode(options);
    return options;
  }
  return {};
};
