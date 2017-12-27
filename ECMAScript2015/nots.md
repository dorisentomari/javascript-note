### 数组去重
+ Set
```javascript
[...new Set(array)]
```
+ Array.from
```javascript
function dedupe(array) {
    return Array.from(new Set(array));
}

console.log(dedupe([1, 1, 2, 5])); // [ 1, 2, 5 ]
```