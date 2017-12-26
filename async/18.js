const superagent = require('superagent');
const NUMBER = 3;
async function one(){
	let i;
	for(i = 0;i < NUMBER; ++i ){
		try{
			await superagent.get('https://developer.mozilla.org/zh-CN/wrongpage');
			break;
		}catch(err){
			console.log(err);
		}
	}
	console.log(i);
}

one();