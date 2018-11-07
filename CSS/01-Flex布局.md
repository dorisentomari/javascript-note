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
```

# 1. flex-direction
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
![flex-direction: row;图例](./01-Flex布局/images/01-flex-direction-row.png)

```css
.box { 
    flex-direction: row; 
}
```

### 1.2 `flex-direction: row-reverse;`
![flex-direction: row-reverse;图例](./01-Flex布局/images/01-flex-direction-row-reverse.png)

```css
.box { 
    flex-direction: row-reverse; 
}
```

### 1.3 `flex-direction: column;`
![flex-direction: column;图例](./01-Flex布局/images/01-flex-direction-column.png)

```css
.box { 
    flex-direction: column; 
}
```

### 1.4 `flex-direction: column-reverse;`
![flex-direction: row-reverse;图例](./01-Flex布局/images/01-flex-direction-column-reverse.png)

```css
.box { 
    flex-direction: column-reverse; 
}
```

# 2. flex-wrap
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
![flex-wrap: nowrap;图例](./01-Flex布局/images/02-flex-wrap-nowrap.png)

```css
.box { 
    flex-direction: row;
    flex-wrap: nowrap;
}
```

### 2.2 `flex-wrap: wrap;`
![flex-wrap: wrap;图例](./01-Flex布局/images/02-flex-wrap-wrap.png)

```css
.box { 
    flex-direction: row;
    flex-wrap: wrap;
}
```

### 2.1 `flex-wrap: wrap-reverse;`
![flex-wrap: wrap-reverse;图例](./01-Flex布局/images/02-flex-wrap-wrap-reverse.png)

```css
.box { 
    flex-direction: row;
    flex-wrap: wrap-reverse;
}
```
