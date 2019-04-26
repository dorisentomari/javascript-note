let arr = [1, [[2], 3, 4], 5];
let target = [1, 2, 3, 4, 5];

// 方法1
function methodA(arr) {
    return arr.join(',').split(',').filter(k => !!k).map(k => Number(k));
}

// 方法2
function methodB(arr) {
    return arr.toString().split(',').filter(k => !!k).map(k => Number(k));
}

// 方法3
function methodC(arr) {
    return arr.toString().match(/\d/g).filter(k => !!k).map(k => Number(k));
}

// 方法4
function methodD(arr) {
    return arr.reduce((flat, toFlat) => {
        return flat.concat(Array.isArray(toFlat) ? methodD(toFlat) : toFlat);
    }, []);
}

// 方法5
function methodE(arr) {
    return JSON.parse('[' + arr.toString() + ']');
}


// 方法6
function methodF(arr) {
    return JSON.parse('[' + JSON.stringify(arr).replace(/[\[\]]/g, '') + ']');
}
