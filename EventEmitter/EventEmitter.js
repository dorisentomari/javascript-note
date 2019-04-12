const EventEmitter = require('./events');
const util = require('util');
// on 绑定事件
// emit 发射事件

function Girl() { }

util.inherits(Girl, EventEmitter);
let cry = () => {
  console.log('cry cry');
}

let girl = new Girl();

girl.on('newListener', type => {
  console.log('type: ', type)
})

girl.once('one1', cry);

girl.emit('one1', 'smile smile')
girl.emit('one1', 'smile smile')
girl.emit('one1', 'smile smile')
