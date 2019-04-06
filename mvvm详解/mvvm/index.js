// 编译
class Compiler {
  constructor(el, vm) {
    this.vm = vm;
    // 判断 el 的 dom 是否存在
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    // 把当前节点中的元素获取到，然后放到内存中
    let fragment = this.node2fragment(this.el);
    // 把节点中的内容进行替换

    // 编译模板
    this.compile(fragment);
    // 再把内容放入到页面中
    this.el.appendChild(fragment);
  }

  // 判断元素是否是 dom 节点
  isElementNode(node) {
    return node.nodeType === 1;
  }

  // 判断是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-');
  }

  // 把当前元素的节点，放到内存中
  node2fragment(node) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = node.firstChild) {
      // appendChild 具有移动性
      fragment.appendChild(firstChild);
    }
    return fragment;
  }

  // 编译内存中的 dom 节点
  compile(node) {
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child);
        // 如果是元素的话，需要把自己传递，再去遍历子节点
        this.compile(child);
      } else {
        this.compileText(child);
      }
    });
  }

  // 核心编译方法，编译元素
  compileElement(node) {
    let attributes = node.attributes;
    [...attributes].forEach(attr => {
      let {name, value: expr} = attr;
      if (this.isDirective(name)) {
        let [, directive] = name.split('-');
        // 调用不同的指令来处理
        CompileUtil[directive](node, expr, this.vm);
      }
    });
  }

  // 编译文本，判断当前文本节点是否包含 {{}}
  compileText(node) {
    let content = node.textContent;
    // 找到所有符合 {{}} 语法的
    if (/\{\{(.+?)\}\}/.test(content)) {
      CompileUtil['text'](node, content, this.vm);
    }
  }
}


// 基类
class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    // 根元素存在，需要编译模板
    if (this.$el) {
      // 把数据全部转化成用 Object.defineProperty 来定义
      new Observer(this.$data);
      console.log(this.$data);
      new Compiler(this.$el, this);
    }
  }
}
