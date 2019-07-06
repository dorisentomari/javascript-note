let myModule = (function () {
  let module = {
    exports: {}
  };
  console.log(this);
  module.exports = 'hello';
  return module.exports;
})();

console.log(myModule);
