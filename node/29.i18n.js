const http = require('http');

let language = {
  en: 'mark',
  'zh-CN': '马克'
};

http.createServer((req, res) => {
  let languages = req.headers['accept-language'];
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  if (languages) {
    let lans = languages.split(',').map(lan => {
      let [l, q = 'q=1'] = lan.split(';');
      let obj = {};
      obj['name'] = l;
      obj['q'] = q.split('=')[1];
      return obj;
    }).sort((a, b) => b.q - a.q);
    let current = lans.find(item => {
      let name = item.name;
      return language[name];
    });
    if (current) {
      res.end(language[current.name]);
    } else {
      res.end(language['en']);
    }
  } else {
    res.end(language['en']);
  }
}).listen(3000);

