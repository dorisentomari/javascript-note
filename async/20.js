let [one, two] = await Promise.all([getOnw(), getTwo()]);

// or

let onePromise = getOne();
let twoPromise = getTwo();
let one = await onePromise;
let two = await twoPromise;
