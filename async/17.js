async function main(){
	try{
		const one = await function(){
			return 111;
		}
		const two = await function(ken){
			return ken;
		}
		const three = await function(men, gen){
			return men * gen;
		}
	}catch(err){
		console.log(err);
	}
}
main();