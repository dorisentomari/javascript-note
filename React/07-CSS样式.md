# CSS样式
# 1. 基本样式设置
### 1.1 直接在行内使用`style prop`,`style prop`需要是一个对象
+ 样式中的像素值，React自动把需要`px`的属性添加`px`
+ 使用`classnames`库，通过React官方提供的`React.addons.classSet`插件来给组件动态设置`className`，但是后来为了精简API，被移除了，我们可以直接使用`classnames`库

```javascript
const UserComponent = () => (
  <p style={{color: 'red', width: 50}}>
    User Component
  </p>
);
```

+ 使用`classnames`

```javascript
import React, {Component} from 'react';
import classNames from 'classnames';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: true,
      isHovered: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let btnClass = classNames({
      'btn': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': true
    });

    // 此时button的class名为btn btn-pressed，没有 btn-over

    return (
      <div>
        <p>
          <button className={btnClass} onClick={this.handleClick}>click</button>
        </p>
      </div>
    );
  }
}

export default Home;
```

# 2. 使用 CSS Modules
### 2.2.1 CSS模块化解决方案主要有两类
+ Inline Style，彻底抛弃CSS，使用JavaScript或JSON书写样式，能给CSS提供JavaScript同样强大的模块化能力。但是缺点很明显，Inline Style几乎不能利用CSS本身的特性，比如级联，媒体查询，:hover等伪类，这些还需要依赖框架实现，与React相关的有 `Radium`，`jsxstyle`和`react-style`
+ CSS Modules，依然使用CSS，但是使用JavaScript来管理样式依赖。CSS Modules能最大化地结合现有CSS生态和JavaScript模块化能力，发布时依旧编译出单独的JavaScript和CSS 文件。现在webpack css-loader内置CSS Modules功能。

### 2.2.1 CSS模块化遇到的问题
+ CSS模块化解决了CSS样式的导入和导出。灵活按照需要导入以便复用代码，导出时能够隐藏内部作用域，避免全局污染

+ Sass，Less，PostCSS视图解决CSS编程能力弱的问题，但是没有解决模块化的问题。
  - 全局污染。CSS使用全局选择器机制来设置样式，优点是方便样式重写，缺点是所有的样式都是全局生效，样式可能被错误覆盖。因此产生了`!important`甚至是`inline !important`和复杂的选择器权重计数表，提高了犯错率和使用成本。Web Components 标准中的Shadow DOM能彻底解决这个问题，但是它把样式彻底局部化，造成外部无法重写样式，损失了灵活性。
  - 命名混乱: 由于全局污染的问题，多人协同开发时为了避免样式冲突，选择器越来越复杂，容易形成不同的命名风格，很难统一，样式变多后，命名将更加混乱。
  - 依赖管理不彻底: 组件应该相互独立，引入一个组件时，应该只引入它所需要的CSS样式。现在的做法是处理要引入JavaScript，还要引入它的CSS，而且Sass/Less很难实现对每个组件都编译出单独的CSS，引入所有的模块的CSS又造成浪费。javascript的模块化已经非常成熟，如果让JavaScript来管理CSS依赖是很好的解决方案，而webpack的css-loader提供了这种能力。
  - 无法共享变量: 复杂组件要使用JavaScript和CSS来共同处理样式，就会造成有些变量在JavaScript和CSS中冗余，而预编译语言不能提供跨JavaScript和CSS共享变量的这种能力
  - 代码压缩不彻底: 由于移动端网络的不确定性，现代工程项目对CSS压缩的要求已经到了变态的地步，很多压缩工具为了节省一个字节，就把16px转为1pc，但是这对非常长的类名却无能为力。

+ 在webpack.config.js中配置CSS Modules，可以直接在js文件中引入`***.css`文件，在webpack中配置`localIdentName`自动生成的`class`名称，其中类名最后的文字就是给定算法生成的序列码。经过混淆处理之后，`class`类名基本就是唯一的，降低了项目中样式覆盖的几率。在生产环境下修改规则，生成更短的class名，可以提高css压缩率

### 2.2.2 CSS Modules实现了以下几点
+ 所有的样式都是局部化的，解决了命名冲突和全局污染的问题
+ class名的生成规则配置灵活，可以压缩class名
+ 只需要引用组件的JavaScript，就可以搞定组件所有的JavaScript和CSS

### 2.2.3 局部默认样式
+ 使用CSS Modules后，相当于给每一个class名外加了`:local`，依次来实现样式的局部化。如果像要切换到全局模式，可以使用`:global`包裹

```css
.normal {
  color: green;
}
/** 定义局部样式，上边的和这个等价 **/
:local(.normal) {
  color: green;
}

/** 定义全局样式 **/
:global(.btn) {
  color: red;
}

/** 定义多个全局样式 **/
:global {
  .link {
    color: green;
  }
  .box {
    color: yellow;
  }
}

```

### 2.2.4 使用`composes`来组合样式
+ 对于样式复用，CSS Modules只提供了唯一的方式来处理`composes`组合

```css
/** Button.css **/
.base {
  color: red;
  background: blue;
}

.normal {
  composes: base;
  font-size: 18px;
}

.disabled {
  composes: base;
  font-color: #eee;
}
```

```javascript
// Button.js
import styles from './Button.css';

buttonElem.outerHTML = `<button class=${styles.normal}></button>`;
```

```html
<!-- 生成的HTML -->
<button class="button--base-abc53 button--normal-abc53">click</button>
```

+ `composes`还可以组合外部的文件中的样式

```css
.primary-color {
  color: #f40;
}

.base {
  /** common style **/
}

.primary {
  composes: base;
  composes: $primary-color from './setting.css';
}
```

### 2.3 class命名技巧
+ CSS Modules的命名规范是从BEM扩展而来的，BEM把样式名分为3个级别
+ Block: 对应的模块名，如 Dialog
+ Element: 对应模块中的节点名 Comfirm Button
+ Modifier: 对应节点相关的状态，如disabled和highlight

BEM最终得到的class名为`dialog__confirm-button--hightlight`，使用双符号`__`和`--`是为了与区块内单次间的分隔符区分开来。

CSS Modules中的CSS文件名恰好对应Block名，只需要考虑Element和Modifier即可。

### 2.4 CSS Modules使用技巧
+ 不使用选择器，只使用class类名来定义样式
+ 不层叠多个class，只使用一个class把所有的样式定义好
+ 所有样式通过composes组合来实现复用
+ 不要使用嵌套

### 2.5 使用CSS Modules遇到的问题
+ 对一个元素使用多个class？ 样式照样生效
+ 在一个style文件中使用同名的class？ 同名class编译后虽然可能是随机码，但仍是同名的
+ 在style文件中使用id，伪类选择器？这些选择器不会被替换，原封不动地出现在编译后CSS文件中，也就是说，CSS Modules只会转换class名相关的样式。
+ CSS Modules结合历史遗留项目？CSS Modules能够做到现有的项目能平滑迁移。

### 2.6 外部如何覆盖局部样式
+ 给现有的组件节点上加上`data-role`属性，通过属性选择器来覆盖样式

```javascript
// dialog.js
const DialogComponent = () => {
  return (
    <div>
      <button data-role="dialog-confirm-btn"></button>
    </div>
  );
}
```

```css
/** dialog.css **/
[data-role="dialog-root"] {
  /** some style**/
}
```

### 2.7 CSS Modules与React
+ 在className处直接使用CSS中的class名即可。
+ 一般把组件最外层节点对应的class名称为root
+ // TODO 如果不想频繁的输入`style.**`，可以使用`react-css-modules`，通过高阶组件的形式避免重复输入`style.**`
