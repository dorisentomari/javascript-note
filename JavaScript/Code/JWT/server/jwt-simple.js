let jwt = {
  toBase64 (str) {
    return Buffer.from(str).toString('base64');
  },
  sign (str, secret) {
    return require('crypto').createHmac('sha256', secret).update(str).digest('base64');
  },
  fromBase64ToString(base64) {
    return Buffer.from(base64, 'base64').toString('utf8');
  },
  encode (payload, secret) {
    let headers = this.toBase64(JSON.stringify({
      typ: 'JWT',
      alg: 'HS256'
    }));
    let content = this.toBase64(JSON.stringify(payload));
    let sign = this.sign([headers, content].join('.'), secret);
    return [headers, content, sign].join('.');
  },
  decode (token, secret) {
    let [headers, content, sign] = token.split('.');
    let h = JSON.parse(this.fromBase64ToString(headers));
    let c = JSON.parse(this.fromBase64ToString(content));
    if (sign === this.sign([headers, content].join('.'), secret)) {
      throw new Error('校验失败');
    }
    return c;
  }
};

module.exports = jwt;
