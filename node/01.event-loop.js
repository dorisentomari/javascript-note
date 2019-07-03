// 栈，先进后出
// 堆，先进先出

setTimeout(() => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(7);
    Promise.resolve().then(() => {
      console.log(10);
    });
  });
}, 1000);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(8);
  });
}, 1000);

setTimeout(() => {
  console.log(3);
}, 1000);

Promise.resolve().then(() => {
  console.log(4);
});

Promise.resolve().then(() => {
  console.log(5);
});

Promise.resolve().then(() => {
  console.log(6);
  setTimeout(() => {
    console.log(9);
  }, 1000);
});

// 4, 5, 6, 1, 7, 2, 8, 3, 9
