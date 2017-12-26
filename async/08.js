async function one(name){
	if(!name){
		throw new Error('no arguments');
	}
}

one().then((value) => {
	console.log('value:', value);
}, (err) => {
	console.log(err);
});

// Error: no arguments