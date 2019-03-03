function loadImg(src, callback, fail) {
	let img = document.createElement('img');
	img.onload = function() {
		callback(img);
	}
	img.onerror = function() {
		fail();
	}
	img.src = src;
}
const src = 'https://www.baidu.com/img/bd_logo1.png';
loadImg(src, function(img) {
	console.log(img.width);
}, function() {
	console.log('failed');
});