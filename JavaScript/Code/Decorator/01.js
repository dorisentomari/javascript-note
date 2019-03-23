// npx babel 01.js -w --out-file 001.js
class Animal {
  @readonly
  PI = 3.14;
  @before
  say (a,b,c) {
    console.log('说话', a, b, c);
  }
}

function readonly (target, property, descriptor) {
  // 可以把装饰的属性改为不可以修改的值，如果修改，那么就会报错
  descriptor.writable = true
  console.log(target);
  console.log(property);
  console.log(descriptor);
}

function before (target, property, descriptor) {
  let oldSay = descriptor.value;
  console.log(target);
  console.log(property);
  console.log(descriptor);
  descriptor.value = function () {
    console.log('before');
    oldSay.call(target, ...arguments);
  }
}


let tiger = new Animal()
tiger.PI = 3.15
tiger.say(1,2,3)
