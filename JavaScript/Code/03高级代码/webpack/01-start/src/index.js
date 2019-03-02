let $ = require('expose-loader?$!jquery');
let i2 = require('./i2');
document.getElementById('app').innerHTML = i2;
$('#app').css({fontSize: '30px', background: 'orange'});
// require('style-loader!css-loader!./css/index.css');
