let content = document.getElementById('content');

let str = '';

let xhr = new XMLHttpRequest();

xhr.open('get', '/api/img', true);

xhr.responseType = 'json';

xhr.onload = function () {
  let arr = xhr.response;
  arr.forEach(item => {
    str += `<li><img src="${item}" /></li>`
  });
  content.innerHTML = str;
};

xhr.send();

