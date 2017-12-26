async function one() {}

const two = async function() {}

let obj = {
	async one(){

	}
};
obj.one().then();

class Person {
	constructor() {
		this.avatar = 'avatar';
	}

	async getAvatar(name){
		const cache = await this.avatar;
		return cache.match(`/avatar/${name}.jpg`)
	}
}

const user = Person();
user.getAvatar('Mark').then();


const three = async () => {}