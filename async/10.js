async function one(){
	return await 'async and await';
}

one().then(value => {
	console.log(value)
});
// async and await