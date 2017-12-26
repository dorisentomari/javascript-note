fetch('./01.js',{
	method: 'get'
}).then( val => {
	console.log(val);
}).catch( err => {
	console.log(err);
})