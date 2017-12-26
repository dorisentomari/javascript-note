async function one(data){
	let docs = [{}, {}, {}];
	docs.forEach(doc => {
		await data.post(doc);
	})
}