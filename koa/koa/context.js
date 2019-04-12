let ctx = {};

function defineGetter(property, key) {
  ctx.__defineGetter__(key, function () {
    return this[property][key]
  });
}

function defineSetter(property, key) {
  ctx.__defineSetter__(key, function (value) {
    this[property][key] = value;
  });
}


defineGetter('request', 'url');
defineGetter('response', 'body');
defineSetter('response', 'body');



module.exports = ctx;