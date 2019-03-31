import perf from './performance';
import resource from './resource';
import xhr from './xhr';
import errorCatch from './errorCatch';

// 获取到页面性能相关数据
// let formatObj = (data) => {
//   let str = '';
//   for (let key in data) {
//     str += `${key}=${data[key]}&`
//   }
//   return str.substring(0, str.length - 1);
// };

// perf.init((data) => {
//   console.log(data);
//   // 可能是一个空图片
//   new Image().src = '/p.gif' + formatObj(data);
// });

// resource.init(data => {
//   console.log(data);
// });

// xhr.init(data => {
//   console.log(data);
// });

errorCatch.init(data => {
  console.log(data);
});
