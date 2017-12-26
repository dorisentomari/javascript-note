async function one(){
	await Promise.reject('there are some wrong....').catch(e => {console.log(e)})	
	return await Promise.resolve('async function await');
}

one().then(value => {console.log(value)});
