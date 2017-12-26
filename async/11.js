async function one(){
	await Promise.reject('there are some wrong...');
}

one().then(value => {
	console.log(value);
}).catch( err => {
	console.log(err);
});
// there are some wrong...