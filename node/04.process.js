// console.dir(global, { showHidden: true });

// process.env 执行的环境
// process.argv 执行的环境参数
// process.cwd()，当前的执行目录

// console.log(process.cwd());
// console.log(process.argv);

let argv = process.argv.slice(2);

let params = argv.reduce((prev, curr, index, arr) => {
  if (curr.includes('--')) {
    prev[curr.slice(2)] = arr[index+1];
  }
  return prev;
}, {});

// console.log(params);

// process.nextTick(() =>{
//   console.log('nextTick1');
// });

// setImmediate(() => {
//   console.log('setImmediate');
// });

Promise.resolve().then(() => {
  console.log('promise 1');
  setTimeout(() => {
    console.log('setTimeout 1');
  });
});

setTimeout(() => {
  console.log('setTimeout 2');
  Promise.resolve().then(() => {
    console.log('promise 2');
  });
});

// process.nextTick(() =>{
//   console.log('nextTick2');
// });


// console.log('hello, node');




