async function one(){
	await new Promise((resolve, reject) => {
		throw new Error('there are some wrong...');
	})
}

one().then(value => {
	console.log(value);
}).catch(err => {
	console.log(err);
});
