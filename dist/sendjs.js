(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.sendjs = factory());
}(this, (function () { 'use strict';

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
    return toString.call(val) === '[object Array]';
  }
  /**
   * Determine if a value is an String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isString(val) {
    return toString.call(val) === '[object String]';
  }
  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (typeof result[key] === 'object' && typeof val === 'object') {
        result[key] = merge(result[key], val);
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  /**
   * encodeURIComponent
   *
   * @export
   * @param {any} val
   * @returns
   */
  function encodeValue(val) {
    return encodeURIComponent(val)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  /**
   * error log
   *
   * @export
   * @param {any} msg
   */
  function logError(msg) {
    console.error(msg || `log error ~!`);
  }
  /**
   * warn log
   *
   * @export
   * @param {any} msg
   */
  function logWarn(msg) {
    console.warn(msg || `log warn ~!`);
  }

  /**
   * request param key sort
   *
   * @export
   * @param {object} datas
   * @returns a=>z
   */
  function keySort(reqs) {
    return Object.keys(reqs).sort(function(a, b) {
      return a.split('=')[0] > b.split('=')[0] ? 1 : -1;
    });
  }
  /**
   * sign
   *
   * @export
   * @param {any} opts
   * @returns {string}
   */
  function sign(opts) {
    const reqs = opts.data;
    let keyArr = keySort(reqs);
    let _sg = [];
    for (let i = 0; i < keyArr.length; i++) {
      _sg.push(keyArr[i] + '=' + reqs[keyArr[i]]);
    }
    return _sg.join('&') + '&=requestKey' + opts.requestKey;
  }

  /**
   * @Author: wangqibiao
   * @Date:   2017/7/11
   * @Last Modified by:   wangqibiao
   * @Last Modified time: 10:59
   */

  /**
   * @功能 md5加密
   */

  var rotateLeft = function(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  };
  var addUnsigned = function(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 0x80000000;
    lY8 = lY & 0x80000000;
    lX4 = lX & 0x40000000;
    lY4 = lY & 0x40000000;
    lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  };
  var F = function(x, y, z) {
    return (x & y) | (~x & z);
  };
  var G = function(x, y, z) {
    return (x & z) | (y & ~z);
  };
  var H = function(x, y, z) {
    return x ^ y ^ z;
  };
  var I = function(x, y, z) {
    return y ^ (x | ~z);
  };
  var FF = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var GG = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var HH = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var II = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var convertToWordArray = function(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWordsTempOne = lMessageLength + 8;
    var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - lNumberOfWordsTempOne % 64) / 64;
    var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - lByteCount % 4) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition);
      lByteCount++;
    }
    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };
  var wordToHex = function(lValue) {
    var WordToHexValue = '',
      WordToHexValueTemp = '',
      lByte,
      lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValueTemp = '0' + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
    }
    return WordToHexValue;
  };
  var uTF8Encode = function(string) {
    string = string.replace(/\x0d\x0a/g, '\x0a');
    var output = '';
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        output += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        output += String.fromCharCode((c >> 6) | 192);
        output += String.fromCharCode((c & 63) | 128);
      } else {
        output += String.fromCharCode((c >> 12) | 224);
        output += String.fromCharCode(((c >> 6) & 63) | 128);
        output += String.fromCharCode((c & 63) | 128);
      }
    }
    return output;
  };

  function md5(string) {
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22;
    var S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20;
    var S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23;
    var S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;
    string = uTF8Encode(string);
    x = convertToWordArray(string);
    a = 0x67452301;
    b = 0xefcdab89;
    c = 0x98badcfe;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
      d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
      b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
      a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
      c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
      b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
      d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
      c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
      b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
      a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
      d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
      c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
      b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
      a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
      d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
      c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
      b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
      a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
      b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
      a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
      d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
      c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
      b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
      a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
      d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
      c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
      b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
      a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
      c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
      b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
      a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
      d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
      c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
      b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
      a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
      d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
      c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
      a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
      d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
      c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
      b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
      a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
      d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
      c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
      b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
      a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
      d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
      c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
      b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
      a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
      d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
      c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
      b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
      a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
      d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
      c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
      b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
      a = addUnsigned(a, AA);
      b = addUnsigned(b, BB);
      c = addUnsigned(c, CC);
      d = addUnsigned(d, DD);
    }
    var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    return tempValue.toLowerCase();
  }

  /**
   * The formatted Request
   */
  function transformRequest(opts) {
    if (opts.requestKey) {
      opts.data['sign'] = md5(sign(opts));
    }
    let reqs = opts.data;
    let reqArr = [];
    for (let variable in reqs) {
      if (reqs.hasOwnProperty(variable)) {
        //filter undefined|null
        if (reqs[variable] == undefined || reqs[variable] == null) {
          logWarn(`${variable} value is reqs[variable]`);
        }
        reqArr.push(encodeValue(variable) + '=' + encodeValue(reqs[variable]));
      }
    }
    return reqArr.join('&');
  }

  /**
   *
   *
   * @export
   * @param {any} params
   */
  function transformResponse(args) {
    return JSON.parse(args);
  }

  /**
   * request
   * 1. create http
   * 2. open http
   * 3. set header
   * 4. send http data
   * 5. watch http
   */
  function createHttpRequest(args) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(
        args.type,
        (args.baseUrl = args.type === 'GET' ? `${args.baseUrl}${args.data}` : args.baseUrl),
        args.async
      );
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(transformResponse(xhr.responseText));
        }
      };
      xhr.onerror = function() {
        reject(xhr);
      };
      xhr.setRequestHeader(Object.keys(args.header).join(''), Object.values(args.header).join(''));
      if (args.type === 'GET') {
        xhr.send(null);
      } else {
        xhr.send(args.data);
      }
    });
  }

  /**
   * init Command info
   *
   * @export
   * @param {any} cmd
   */
  function initMixin(cmd) {
    return cmd.prototype._init = function(opts) {
      return createHttpRequest({
        baseUrl: opts.baseUrl,
        type: opts.type.toUpperCase(),
        async: opts.async,
        header: opts.header,
        success: opts.success,
        error: opts.error,
        data: transformRequest(opts)
      });
    };
  }

  let id = 0;
  /**
   * create Command
   *
   * @export
   * @param {any} options
   */
  function Command(options) {
    if (!(this instanceof Command)) {
      logError('Command is a constructor and should be called with the `new` keyword');
    }
    this.$id = id++;
    return this._init(options);
  }
  initMixin(Command);

  var defaultConfig = {
    //default request params
    data: {},
    //request type【post，get】
    type: 'get',
    async:true,
    //request server address
    baseUrl: '',
    //request header
    header: {
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    //requestKey
    requestKey: '',
  };

  /**
   * request baseUrl
   *
   * @export
   * @param {any} baseUrl
   * @param {any} url
   * @returns The formatted url
   */
  function transformServer(baseUrl, url) {
    let serverUrl = baseUrl;
    if (url && isString(url)) {
      serverUrl += url;
    }
    serverUrl += serverUrl.indexOf('?') === -1 ? '?' : '&';
    return serverUrl;
  }

  /**
   * merge config
   *
   * @export
   * @param {any} opts
   * @returns
   */
  function mergeConfig(opts) {
    return merge(opts.config, {
      type: 'post',
      data: opts.data,
      baseUrl: transformServer(opts.baseUrl, opts.url)
    });
  }

  let sendjs = {};
  /**
   * create entry
   *
   * @export
   * @param {any} config
   * @returns
   */
  function createEntry(config) {
    return new Command(config);
  }
  /**
   * default params
   * @param {object} config
   */
  sendjs.defaults = defaultConfig;
  /**
   * create default params
   * @param {object} options
   */
  sendjs.create = function(options) {
    this.defaults = merge(defaultConfig, options);
  };
  /**
   * ajax method
   * @param {*} options
   */
  sendjs.ajax = function(options) {
    return createEntry(
      //merge post request config
      merge(this.defaults, options)
    );
  };
  /**
   * post method
   * @param {string} url
   * @param {object} data
   */
  sendjs.post = function(url = '', data = {}, config = {}) {
    return this.ajax(
      mergeConfig({
        baseUrl: this.defaults.baseUrl,
        url: url,
        data: data,
        config: config
      })
    );
  };
  /**
   * get method
   * @param {string} url
   * @param {object} data
   * @param {object} config
   */
  sendjs.get = function(url = '', data = {}, config = {}) {
    return this.ajax(
      mergeConfig({
        baseUrl: this.defaults.baseUrl,
        url: url,
        data: data,
        config: config
      })
    );
  };
  /**
   * downClient method
   * @param {*} url
   * @param {*} data
   * @param {*} config
   */
  sendjs.downClient = function(url = '', data = {}, config = {}) {
    const ajaxConfig = merge(
      this.defaults,
      mergeConfig({
        baseUrl: this.defaults.baseUrl,
        url: url,
        data: data,
        config: config
      })
    );
    window.open(`${ajaxConfig.baseUrl}${transformRequest(ajaxConfig)}`);
  };
  /**
   * upClient method
   * @param {*} url
   * @param {*} data
   * @param {*} config
   */
  sendjs.upClient = function(url = '', data = {}, config = {}) {
    this.post(url, data, config);
  };

  return sendjs;

})));
//# sourceMappingURL=sendjs.js.map
