const pathToRegexp = require('path-to-regexp')

const str = '/user/:name/:age'
const url = '/user/mark/18'
const keys = []
const s = str.replace(/:([^\/]+)/g, function () {
    return '([^\/]+?)'
})
console.log('s')
console.log(new RegExp(s))

const r = pathToRegexp(str, keys)
console.log(r)
const args = keys.map(key => key.name)
console.log(args)
const [, ...rs] = url.match(r)
console.log(rs)
