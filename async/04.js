function timeout(ms){
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function print(value, ms){
	await timeout(ms);
	console.log(value);
}

print('async function promise', 1000);