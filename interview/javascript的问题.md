# 1. 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值

```javascript
const randomNumber = () => Math.floor(Math.random() * 31 + 2);

let len = 5;

let i = 0;

let arr = [];

function randomArr (arr, num) {
  if(arr.indexOf(num) < 0) {
    arr[i] = num;
    i++;
  } else {
    num = randomNumber();
  }
  if (arr.length === len) {
    return arr;
  } else {
    return randomArr(arr, num);
  }
}

let s = randomArr([], randomNumber());

console.log(s);
```

# 2. 计算当月最后一天是几号(当前这个月的天数)
+ 原理: 获取当前的时间，获取下个月当前的时间，两个时间差，换算成天，就是当前这个月的天数

```javascript
function getCurrentMonthLastDay() {
  let currentDay = new Date();
  currentDay.setMonth(currentDay.getMonth() + 1);
  let diff = currentDay - new Date();
  let day = diff / 1000 / 60 / 60 / 24;
  return day;
}

let day = getCurrentMonthLastDay();
console.log(day);
```

# 3. 去除字符串的空格
+ 去除头部空格
+ 去除尾部空格
+ 去除头部和尾部空格
+ 去除中间空格
+ 去除所有空格

```javascript
function trimSpace(str, mode) {
  const POSITION = Object.freeze({
    left: Symbol(),
    right: Symbol(),
    both: Symbol(),
    center: Symbol(),
    all: Symbol(),
  });

  const trimLeftSpace = /^\s+/g;
  const trimRightSpace = /\s+$/g;
  const trimBothSpace = /^\s+|\s+$/g;
  const trimCenterSpace = /\w\s+\w/g;
  const trimAllSpace = /\s/g;

  switch (mode) {
    case POSITION.left:
      str = str.replace(trimLeftSpace, '');
      break;
    case POSITION.right:
      str = str.replace(trimRightSpace, '');
      break;
    case POSITION.both:
      str = str.replace(trimBothSpace, '');
      break;
    case POSITION.center:
      while (str.match(trimCenterSpace)) {
        str = str.replace(/(\w)(\s+)(\w)/, `$1$3`)
      }
      break;
    case POSITION.all:
      str = str.replace(trimAllSpace, '');
      break;
    default:
      str = str.replace(trimBothSpace, '');
      break;
  }
  return str;
}


let str = ' hello world ';
console.log(trimSpace(str, POSITION.left));
console.log(trimSpace(str, POSITION.right));
console.log(trimSpace(str, POSITION.both));
console.log(trimSpace(str, POSITION.center));
console.log(trimSpace(str, POSITION.all));
```

# 4. 去除字符串中最后一个指定的字符
+ str.substr(start, end)，end 默认是到字符串结束
+ str.substring(start, length)，length 默认到字符串结束

```javascript
function removeLastMark(str, mark) {
  if (!str || !mark) {
    return str;
  }
  let idx = str.lastIndexOf(mark);
  if (idx === -1) {
    return str;
  }
  return str.substr(0, idx) + str.substr(idx + 1);
}
```

