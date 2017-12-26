async function timeout(ms){
	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function print(value, ms){
	await timeout(ms);
	console.log(value);
}

print('this is an async function and return promise', 1000);