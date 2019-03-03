function __webpack_require__(moduleId) {
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }
  var module = installedModules[moduleId] = {
    // 模块的 id
    i: moduleId,
    // l 的意思是是否已经被 loader
    l: false,
    exports: {}
  };
  modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  module.l = true;
  return module.exports;
}

function a(module, exports) {
  let chunk1 = 1;
  exports.chunk1 = chunk1;
}
a(module, exports, __webpack_require__)
