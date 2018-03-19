function loadImg(src) {
	const promise = new Promise(function(resolve, reject) {
		let img = document.createElement('img');
		img.onload = function () {
			resolve(img);
		};
		img.onerror = function () {
			reject(img);
		};
		img.src = src;
	});
	return promise;
}
const src = 'https://www.baidu.com/img/bd_logo1.png';
let result = loadImg(src);
result.then(img => {
	console.log(img.width);
}, () =>{
	console.log('failed');
});
result.then(img => {
	console.log(img.height);
});