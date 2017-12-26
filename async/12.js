async function one(){
	await Promise.reject('there are some wrong...');
	await Promise.resolve('print some thing....');
}
one();