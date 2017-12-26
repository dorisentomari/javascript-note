async function one(data){
	let docs = [{}, {}, {}];
	let promises = docs.map( doc => data.post(doc));
	let results = await Promise.all(promises);
	console.log(results);
}

async function two(data){
	let docs = [{}, {}, {}];
	let promises = docs.map( doc => data.post(doc));
	let results = [];
	for(let promise of promises){
		results.push(await promise);
	};
	console.log(results);
}
one('username');
two('password');

