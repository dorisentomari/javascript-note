async function getTitle(url){
	let response = await fetch(url);
	let html = await response.text();
	return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://github.com/').then( value => {
	console.log(value);
})