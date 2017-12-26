async function one(name){
	return name;
}

one('Mark').then((value) => {
	console.log('value:', value);
	// value: Mark
})