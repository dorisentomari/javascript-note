// const EventEmitter = require('events');
const EventEmitter = require('./13.my-events');
const util = require('util');
const process = require('process');

function Girl () {}

util.inherits(Girl, EventEmitter);

let girl = new Girl();

// girl.on('newListener', type => {
//   if (type === 'data') {
//     process.nextTick(() => {
//       girl.emit('data');
//     });
//   }
// });

// girl.on('love', (who) => {
//   console.log(who, 'first happy');
// });

// let listener = (who) => {
//   console.log(who, 'second happy');
// };

// girl.on('love', listener);

// girl.on('data', () => {
//   console.log('data 监听事件 1');
// });

// girl.on('data', () => {
//   console.log('data 监听事件 2');
// });

// girl.on('data', () => {
//   console.log('data 监听事件 3');
// });

// girl.on('data', () => {
//   console.log('data 监听事件 4');
// });

// girl.off('love', listener);
// girl.emit('love', 'i');
// girl.emit('love', 'you');

let listener = () => {
  console.log('happy');
};

girl.once('love', listener);

girl.emit('love');
girl.emit('love');
girl.emit('love');
