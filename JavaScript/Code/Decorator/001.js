"use strict";

var _class, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

// npx babel 01.js -w --out-file 001.js
var Animal = (_class = (_temp =
/*#__PURE__*/
function () {
  function Animal() {
    _classCallCheck(this, Animal);

    _initializerDefineProperty(this, "PI", _descriptor, this);
  }

  _createClass(Animal, [{
    key: "say",
    value: function say(a, b, c) {
      console.log('说话', a, b, c);
    }
  }]);

  return Animal;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "PI", [readonly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3.14;
  }
}), _applyDecoratedDescriptor(_class.prototype, "say", [before], Object.getOwnPropertyDescriptor(_class.prototype, "say"), _class.prototype)), _class);

function readonly(target, property, descriptor) {
  // 可以把装饰的属性改为不可以修改的值，如果修改，那么就会报错
  descriptor.writable = true;
  console.log(target);
  console.log(property);
  console.log(descriptor);
}

function before(target, property, descriptor) {
  var oldSay = descriptor.value;
  console.log(target);
  console.log(property);
  console.log(descriptor);

  descriptor.value = function () {
    console.log('before');
    oldSay.call.apply(oldSay, [target].concat(Array.prototype.slice.call(arguments)));
  };
}

var tiger = new Animal();
tiger.PI = 3.15;
tiger.say(1, 2, 3);
