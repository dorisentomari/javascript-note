const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('./file/english');
  const f2 = yield readFile('./file/japanese');
  console.log(f1);
  console.log(f2);
};

let ken = gen();
console.log(ken.next());
console.log(ken.next());
console.log(ken.next());
console.log(ken.next());
