function spawn(genF) {
	return new Promise(function(resolve, rejct) {
		const gen = genF();
		function step(nextF){
			let next;
			try{
				next = nextF();
			}catch(e){
				return reject(e);
			}
			if(next.done){
				return resolve(next.value);
			}
			Promise.resolve(next.value).then(function(v){
				step(function () {
					return gen.next(v);
				}, function(e){
					setp(function(){
						return gen.throw(e);
					})
				})
			})
		}
		stp(function(){
			return gen.next(undefined);
		})
	})
}