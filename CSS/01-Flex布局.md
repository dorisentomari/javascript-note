# 默认的CSS元素样式
```css
body {
      padding: 20px;
      margin: 0 auto;
      background-color: #E2E2E2;
      max-width: 1024px;
      color: #595B66;
      font-family: 'Microsoft Yahei', sans-serif;
}

.box {
    background-color: white;
    margin: 0 0 55px;
    display: flex;
}

.box-item {
    width: 200px;
    height: 200px;
    line-height: 200px;
    vertical-align: middle;
    margin: 5px;
    background-color: #2bff29;
    font-size: 100px;
    color: white;
    text-align: center;
}

.item-tall {
    height: 400px;
    line-height: 400px;
}
```

# 1. [flex-direction](./01-Flex布局/01-flex-direction.html)
+ `flex-direction`决定主轴的方向，就是项目的排列方向
+ `row`元素横向排列
+ `row-reverse`元素横向反向排列
+ `column`元素纵向排列
+ `column-reverse`元素纵向反向排列

### 1.0 统一的DOM元素
```html
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
</div>
```

### 1.1 `flex-direction: row;`
+ 元素横向正序排列
```css
.box { 
    flex-direction: row; 
}
```

![flex-direction: row;图例](./01-Flex布局/images/01-flex-direction-row.png)

### 1.2 `flex-direction: row-reverse;`
+ 元素横向反序排列

```css
.box { 
    flex-direction: row-reverse; 
}
```

![flex-direction: row-reverse;图例](./01-Flex布局/images/01-flex-direction-row-reverse.png)

### 1.3 `flex-direction: column;`
+ 元素纵向正序排列

```css
.box { 
    flex-direction: column; 
}
```

![flex-direction: column;图例](./01-Flex布局/images/01-flex-direction-column.png)

### 1.4 `flex-direction: column-reverse;`
+ 元素纵向反序排列

```css
.box { 
    flex-direction: column-reverse; 
}
```

![flex-direction: row-reverse;图例](./01-Flex布局/images/01-flex-direction-column-reverse.png)

# 2. [flex-wrap](./01-Flex布局/02-flex-wrap.html)
+ `flex-wrap`定义的是，如果元素在一行里排不下，如何换行
+ `nowrap`不换行
+ `wrap`换行，第一行在上边
+ `wrap-reverse`换行，第一行在下边

### 2.0 统一的DOM元素
```html
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
    <div class="box-item">5</div>
    <div class="box-item">6</div>
    <div class="box-item">7</div>
</div>
```
### 2.1 `flex-wrap: nowrap;`
+ 不换行

```css
.box { 
    flex-direction: row;
    flex-wrap: nowrap;
}
```

![flex-wrap: nowrap;图例](./01-Flex布局/images/02-flex-wrap-nowrap.png)

### 2.2 `flex-wrap: wrap;`
+ 换行

```css
.box { 
    flex-direction: row;
    flex-wrap: wrap;
}
```

![flex-wrap: wrap;图例](./01-Flex布局/images/02-flex-wrap-wrap.png)


### 2.3 `flex-wrap: wrap-reverse;`
+ 换行，第一行在下边

```css
.box { 
    flex-direction: row;
    flex-wrap: wrap-reverse;
}
```
![flex-wrap: wrap-reverse;图例](./01-Flex布局/images/02-flex-wrap-wrap-reverse.png)


# 3. [flex-flow](./01-Flex布局/03-flex-flow.html)
+ `flex-flow`是`flex-direction`和`flex-wrap`的简写形式，第一个值是`flex-direction`,第二个值是`flex-wrap`
+ 默认值是`row`和`nowrap`

```css
.box {
    flex-flow: row nowrap;
}
```

# 4. [justify-content](./01-Flex布局/04-justify-content.html)
+ `justify-content`定义的是元素在主轴的对齐方式
+ `flex-start`左对齐，默认值
+ `flex-end`右对齐
+ `center`居中
+ `space-between`两端对齐，元素之间的间隔都相等
+ `space-around`每个元素两侧的间隔相等。所以元素黄子健的间隔比元素与边框的间隔大一倍

### 4.0 统一的DOM元素
```html
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
</div>
```

### 4.1 `justify-content: flex-start;`
+ 左对齐

```css
.box {
    justify-content: flex-start;
}
```

![justify-content: flex-start;图例](./01-Flex布局/images/04-justify-content-flex-start.png)

### 4.2 `justify-content: flex-end;`
+ 右对齐

```css
.box {
    justify-content: flex-end;
}
```

![justify-content: flex-end;图例](./01-Flex布局/images/04-justify-content-flex-end.png)

### 4.3 `justify-content: center;`
+ 居中

```css
.box {
    justify-content: center;
}
```

![justify-content: center;图例](./01-Flex布局/images/04-justify-content-center.png)

### 4.4 `justify-content: space-between;`
+ 两端对齐，元素之间的间隔都相等

```css
.box {
    justify-content: space-between;
}
```

![justify-content: space-between;图例](./01-Flex布局/images/04-justify-content-space-between.png)

### 4.5 `justify-content: space-around;`
+ 每个元素两侧的间隔相等

```css
.box {
    justify-content: space-around;
}
```

![justify-content: space-around;图例](./01-Flex布局/images/04-justify-content-space-around.png)

# 5. [align-items](./01-Flex布局/05-align-items.html)
+ `align-items`定义的是元素在交叉轴上如何对齐
+ `flex-start`交叉轴的起点对齐
+ `flex-end`交叉轴的终点对齐
+ `center`交叉轴的中点对齐
+ `baseline`元素的第一行文字的基线对齐
+ `stretch`默认值，如果元素未设置高度或设为auto，将占满整个容器的高度

### 5.0 统一的DOM元素和样式
+ DOM元素
```html
<div class="box">
  <div class="box-item">1</div>
  <div class="box-item item-tall">2</div>
  <div class="box-item">3</div>
  <div class="box-item item-tall">4</div>
</div>
```
+ CSS样式
```css
.item-tall {
  height: 400px;
  line-height: 400px;
}
```

### 5.1 `align-items: flex-start;`
+ 交叉轴的起点对齐

```css
.box {
    align-items: flex-start;
}
```

![align-items: flex-start;图例](./01-Flex布局/images/05-align-items-flex-start.png)

### 5.2 `align-items: flex-end;`
+ 交叉轴的终点对齐

```css
.box {
    align-items: flex-end;
}
```

![align-items: flex-end;图例](./01-Flex布局/images/05-align-items-flex-end.png)

### 5.3 `align-items: center;`
+ 交叉轴的中点对齐

```css
.box {
    align-items: center;
}
```

![align-items: center;图例](./01-Flex布局/images/05-align-items-center.png)

### 5.4 `align-items: baseline;`
+ 元素的第一行文字的基线对齐

```css
.box {
    align-items: center;
}
.item-tall {
    line-height: initial;
    font-size: 122px;
}
```

![align-items: center;图例](./01-Flex布局/images/05-align-items-center.png)

### 5.5 `align-items: stretch;`
+ 默认值，如果元素未设置高度或设为auto，将占满整个容器的高度

```css
.box {
    align-items: stretch;
}
```

![align-items: stretch;图例](./01-Flex布局/images/05-align-items-stretch.png)

# 6. [align-content](./01-Flex布局/05-align-content.html)
+ `align-content`定义的是多根轴线(多行)的对齐方式，如果元素只有一根轴线，该属性不起作用
+ `flex-start`交叉轴的起点对齐
+ `flex-end`交叉轴的终点对齐
+ `center`交叉轴的中点对齐
+ `space-between` 与交叉轴两端对齐，轴线之间的间隔平均分布
+ `space-around` 每根轴线两侧的间隔相等
+ `stretch`默认值，如果元素未设置高度或设为auto，轴线占满整个交叉轴

### 6.1 `align-content: flex-start;`
+ 交叉轴的起点对齐

```css
.box {
    align-content: flex-start;
}

.box-tall {
    height: 880px;
}

```

![align-content: flex-start;图例](./01-Flex布局/images/06-align-content-flex-start.png)

### 6.2 `align-content: flex-end;`
+ 交叉轴的起点对齐

```css
.box {
    align-content: flex-end;
}

.box-tall {
    height: 880px;
}

```

![align-content: flex-end;图例](./01-Flex布局/images/06-align-content-flex-end.png)

### 6.3 `align-content: center;`
+ 交叉轴的起点对齐

```css
.box {
    align-content: center;
}

.box-tall {
    height: 880px;
}

```

![align-content: center;图例](./01-Flex布局/images/06-align-content-center.png)

### 6.4 `align-content: space-between;`
+ 交叉轴的起点对齐

```css
.box {
    align-content: space-between;
}

.box-tall {
    height: 880px;
}

```

![align-content: space-between;图例](./01-Flex布局/images/06-align-content-space-between.png)

### 6.5 `align-content: space-around;`
+ 交叉轴的起点对齐

```css
.box {
    align-content: space-around;
}

.box-tall {
    height: 880px;
}

```

![align-content: space-around;图例](./01-Flex布局/images/06-align-content-space-around.png)

### 6.6 `align-content: stretch;`
+ 交叉轴的起点对齐

```css
.box {
    align-content: stretch;
}

.box-tall {
    height: 880px;
}

```

![align-content: stretch;图例](./01-Flex布局/images/06-align-content-stretch.png)
