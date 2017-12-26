async function getName(name){
	const symbol = await getSymbol(name);
	const price = await getPrice(symbol);
	return price;
}

function getSymbol(symbol){
	return symbol;
}

function getPrice(name){
	return 100;
}

getName('carl').then( result => {
	console.log(result);
});
