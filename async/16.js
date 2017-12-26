async function one(){
	try{
		await new Promise((resolve, reject) => {
			throw new Error('there are some wrong...');
		});
	}catch(err){
		console.log(err);
	}
	return await('async function await');
}

one();