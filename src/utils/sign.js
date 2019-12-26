'use strict'

function safeAdd(x, y) {
  let lsw = (x & 0xffff) + (y & 0xffff)
  let msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xffff)
}

function bitRotateLeft(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
}

function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn((b & c) | (~b & d), a, b, x, s, t)
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t)
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t)
}

function binlMD5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32
  x[(((len + 64) >>> 9) << 4) + 14] = len

  let i
  let olda
  let oldb
  let oldc
  let oldd
  let a = 1732584193
  let b = -271733879
  let c = -1732584194
  let d = 271733878

  for (i = 0; i < x.length; i += 16) {
    olda = a
    oldb = b
    oldc = c
    oldd = d

    a = md5ff(a, b, c, d, x[i], 7, -680876936)
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
    b = md5gg(b, c, d, a, x[i], 20, -373897302)
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

    a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
    d = md5hh(d, a, b, c, x[i], 11, -358537222)
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

    a = md5ii(a, b, c, d, x[i], 6, -198630844)
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

    a = safeAdd(a, olda)
    b = safeAdd(b, oldb)
    c = safeAdd(c, oldc)
    d = safeAdd(d, oldd)
  }
  return [a, b, c, d]
}

function binl2rstr(input) {
  let i
  let output = ''
  let length32 = input.length * 32
  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff)
  }
  return output
}

function rstr2binl(input) {
  let i
  let output = []
  output[(input.length >> 2) - 1] = undefined
  for (i = 0; i < output.length; i += 1) {
    output[i] = 0
  }
  let length8 = input.length * 8
  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32
  }
  return output
}

function rstrMD5(s) {
  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
}

function rstrHMACMD5(key, data) {
  let i
  let bkey = rstr2binl(key)
  let ipad = []
  let opad = []
  let hash
  ipad[15] = opad[15] = undefined
  if (bkey.length > 16) {
    bkey = binlMD5(bkey, key.length * 8)
  }
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636
    opad[i] = bkey[i] ^ 0x5c5c5c5c
  }
  hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
  return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
}

function rstr2hex(input) {
  let hexTab = '0123456789abcdef'
  let output = ''
  let x
  let i
  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i)
    output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
  }
  return output
}

function str2rstrUTF8(input) {
  return unescape(encodeURIComponent(input))
}

function rawMD5(s) {
  return rstrMD5(str2rstrUTF8(s))
}

function hexMD5(s) {
  return rstr2hex(rawMD5(s))
}

function rawHMACMD5(k, d) {
  return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
}

function hexHMACMD5(k, d) {
  return rstr2hex(rawHMACMD5(k, d))
}

function md5(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hexMD5(string)
    }
    return rawMD5(string)
  }
  if (!raw) {
    return hexHMACMD5(key, string)
  }
  return rawHMACMD5(key, string)
}

const APPID = 's5kzk2pzstzwfq46';
const APPKEY = 'U2FsdGVkX19tLd2j1F9DBTs7yNSRm';

function ksort(obj) {
  let ret = {};
  Object.keys(obj).sort().forEach((k) => {
    ret[k] = obj[k];
  });

  return ret;
}

function isJSON(obj) {
  return (typeof(obj) === "object") &&
    (Object.prototype.toString.call(obj).toLowerCase() == "[object object]") &&
    (!obj.length);
}

function now() {
  return parseInt(Date.now() / 1000);
}

function esc(param) {
  return encodeURIComponent(param)
    .replace(/[!'()*]/g, escape)
    .replace(/%20/g, '+');
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function cleanArray(actual) {
  let newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function httpBuildQuery(queryData, numericPrefix, argSeparator, tempKey) {
  numericPrefix = numericPrefix || null;
  argSeparator = argSeparator || '&';
  tempKey = tempKey || null;

  if (!queryData) {
    return '';
  }
  if (!isJSON(queryData)) {
    return queryData;
  }

  let query = Object.keys(queryData).map(function(k) {
    let res;
    let key = k;

    if (tempKey) {
      key = tempKey + '[' + key + ']';
    }

    if (typeof queryData[k] === 'object' && queryData[k] !== null) {
      res = httpBuildQuery(queryData[k], null, argSeparator, key);
    } else {
      if (numericPrefix) {
        key = isNumeric(key) ? numericPrefix + Number(key) : key;
      }

      let val = queryData[k];

      val = val === true ? '1' : val;
      val = val === false ? '0' : val;
      val = val === 0 ? '0' : val;
      val = val || '';

      res = esc(key) + '=' + esc(val);
    }

    return res;
  });

  return cleanArray(query)
    .join(argSeparator)
    .replace(/[!'()*]/g, '');
}

function kvEncode(obj) {
  let ret = [];
  for (let k in obj) {
    ret.push(`${k}=${obj[k]}`);
  }

  return ret.join('&');
}

export function xsignForJava(params, isReturnObject) {

  params = Object.assign(params || {}, {
    "platform-id": "zoububao",
    "x-timestamp": Math.floor(now() / 1000),
    "x-type": "MD5",
    "x-nonce": Math.random(Date.now()).toString(36).substring(2),
  });

  let signstr = kvEncode(ksort(params));
  params['x-sign'] = md5(signstr + '&' + APPKEY);

  if (isReturnObject) {
    return params 
  }

  return httpBuildQuery(params);
}

/**
 * e.g: xsign('GET', '/withdraw/log?debug=1', {"uid": 1})
 *  {"debug": "1", "uid": 1, "x-timestamp": 1501234567, "x-nonce": "ssdfsdf22", "x-type": "MD5", "x-sign": "xxx"}
 *  return debug=1&uid=1&x-nonce=&x-timestamp=&x-type=MD5&x-sign=
 * e.g: xsign('POST', '/withdraw/extract?debug=1', {"uid": 1, "amount": 100, "type": 1, "deviceid": "xxxxxxxx"})
 *  {"uid": 1, "amount": 100, "type": 1, "deviceid": "xxxxxxxx", "x-timestamp": 1501234567, "x-nonce": "ssdfsdf22", "x-type": "MD5", "x-sign": "xxx"}
 *  return amount=100&deviceid=&type=1&uid=1&x-nonce=&x-timestamp=&x-type=MD5&x-sign=
 *
 * @param method string GET|POST|PUT|DELETE...
 * @param uri string
 * @param params object
 * @return string
 */
export function xsignForPhp(method, uri, params, isReturnObject) {

  method = method.toUpperCase();

  if (-1 === uri.lastIndexOf('?')) {
    uri += '?';
  }

  params = Object.assign(params || {}, {
    "x-appid": APPID,
    "x-timestamp": now(),
    "x-type": "MD5",
    "x-nonce": Math.random(Date.now()).toString(36).substring(2),
  });

  let signstr = '';
  if ('POST' === method || 'PUT' === method) {
    signstr = [
      `${method} ${uri}`,
      kvEncode(ksort(params)),
      ''
    ].join("\n");
  } else {
    let query = uri.substring(uri.lastIndexOf('?') + 1);
    if (query !== "") {
      let kvs = {};
      query.split('&').forEach(function(item) {
        let kv = item.split('=');
        if (2 === kv.length) {
          let k = kv[0];
          kvs[k] = kv[1];
        }
      });
      params = Object.assign(kvs, params);
    }
    let args = kvEncode(ksort(params));
    signstr = [
      `${method} ${uri}${args}`,
      '',
      ''
    ].join("\n");
  }
  params['x-sign'] = md5(signstr + APPKEY);

  if (isReturnObject) {
    return params
  }

  return httpBuildQuery(params);
}
