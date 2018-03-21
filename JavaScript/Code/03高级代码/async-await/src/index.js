import 'babel-polyfill'

function loadImg(src) {
    const promise = new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            reject();
        };
        img.src = src;
    });
    return promise;
}

let src1 = 'https://cn.vuejs.org/images/logo.png';
let src2 = 'https://www.baidu.com/img/bd_logo1.png';
let src3 = 'https://www.imooc.com/static/img/index/logo.png';
const load = async function () {
    const result1 = await loadImg(src1);
    console.log('result1');
    console.log(result1);
    const result2 = await loadImg(src2);
    console.log('result2');
    console.log(result2);
    const result3 = await loadImg(src3);
    console.log('result3');
    console.log(result3);
};
load();