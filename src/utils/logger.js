(function(global) {
  
  var PLATFORM = 9;
  var BLOCK_TIME = 500;
  var DEVICE_COOKIE_KEY = 'qm_di';
  var CHANNEL_COOKIE_KEY = 'qm_ch';
  var LOG_API = 'https://log.uugtv.com/q.gif?';
  var LOG_CLICK_ATTRIBUTE_NAME = 'data-log-info';
  var CHANNEL_QUERY_KEY = ['utm_source', 'hmsr', 'ptag', 'from', 'cv'];
  var UA = window.navigator.userAgent;
  var IS_IOS = /ipad|ipod|iphone/i.test(UA);
  var IS_ANDROID = /android/i.test(UA);
  var IS_APP = /qmtv/i.test(UA);
  var IS_TEST = (location.hostname !== 'm.uugtv.com');
  var Position='_mobile2_H5_extend';



  if (IS_ANDROID && IS_APP) {
    PLATFORM = 10
  } else if (IS_IOS && IS_APP) {
    PLATFORM = 11
  }
  
  var _ = {
    on: (function() {
      var prefix = "",
        _addEventListener;
      if (global.addEventListener) {
        _addEventListener = "addEventListener";
      } else {
        _addEventListener = "attachEvent";
        prefix = "on";
      }
      return function(elem, type, callback) {
        return elem[_addEventListener](prefix + type, function(originalEvent) {
          !originalEvent && (originalEvent = global.event);
          callback(originalEvent);
        }, true);
      };
    })(),
    stringify: function(ret) {
      var url = [];
      for (var key in ret) {
        if (ret.hasOwnProperty(key)) {
          url.push(key + '=' + encodeURIComponent(ret[key]));
        }
      }
      return url.join('&');
    },
    bool2num: function(val) {
      return val ? 1 : 0;
    },
    getCookie: function(key) {
      var cookies = document.cookie.split(/\s*;\s*/);
      for (var i = 0, len = cookies.length; i < len; i++) {
        var cookie = cookies[i].split('=');
        if (key == cookie[0]) {
          return cookie[1];
        }
      }
      return null;
      
    },
    setCookie: function(key, value, days) {
      var exp = new Date();
      days = days || 1;
      exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
      var domain = '.uugtv.com';
      var path = '/';
      // debugger
      if (IS_TEST) {
        domain = '.tuji.com'//domain = 'localhost:3001'
      }
      document.cookie = [
        key + '=' + encodeURIComponent(value),
        'expires=' + exp.toGMTString(),
        'domain=' + domain,
        'path=' + path
      ].join(';');
    },
    delCookie: function(key) {
      var val = _.getCookie(key);
      if (val != null) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = key + "=" + val + ";expires=" + exp.toGMTString();
      }
    },
    blockSend: function(src) {
      if (typeof XDomainRequest !== 'undefined') {
        var xhr = new XDomainRequest();
        xhr.open('GET', src, false);
        xhr.send();
        return;
      } else if (global.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        if ('withCredentials' in xhr) {
          xhr.open('GET', src, false);
          xhr.send();
          return;
        }
      }
      _.log(src);
      var start = (new Date).getTime();
      while ((new Date).getTime() - start < BLOCK_TIME) {}
    },
    log: (function() {
      var list = [];
      return function(src) {
        var index = list.push(new Image) - 1;
        list[index].src = src;
        if (list.length > 20) {
          list.splice(0, 10);
        }
      };
    })()
  };
  var genUUID = (function() {
    var _time = new Date,
      // getUrlParam=function(name){
      //   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      //   return r = window.location.search.substr(1).match(reg);
      // },
      getBits = function(val, start, end) {
        val = val.toString(36).split('');
        start = start / 4 | 0;
        end = end / 4 | 0;
        for (var i = start; i <= end; i++) !val[i] && (val[i] = 0);
        return val.slice(start, end + 1).join('');
      },
      rand = function(max) {
        return Math.random() * (max + 1) | 0;
      },
      hnv1a = function(key) {
        key = key.replace(/./g, function(m) {
          return m.charCodeAt();
        }).split('');
        var p = 16777619,
          hash = 0x811C9DC5,
          l = key.length;
        for (var i = 0; i < l; i++) {
          hash = (hash ^ key[i]) * p;
        }
        hash += hash << 13;
        hash ^= hash >> 7;
        hash += hash << 3;
        hash ^= hash >> 17;
        hash += hash << 5;
        hash = hash & 0x7FFFFFFF; //取正.
        hash = hash.toString(36);
        hash.length < 6 && (hash += (l % 36).toString(36));
        return hash;
      },
      info = [
        screen.width,
        screen.height,
        navigator.plugins.length,
        navigator.javaEnabled(),
        screen.colorDepth,
        location.href,
        navigator.userAgent
      ].join('');
      return function() {
      var s = new Date,
        t = (+s + 0x92f3973c00).toString(36),
        m = getBits(rand(0xfff), 0, 7) +
        getBits(rand(0x1fff), 0, 7) +
        getBits(rand(0x1fff), 0, 8),
        c = Math.random() * (251) + 50 | 0, // random from 50 - 300
        a = [];
        t.length < 9 && (t += (s % 36).toString(36));
        for (; c--;) { //借助不定次数,多次随机，打散客户端，因软硬环境类似，导致产生随机种子的线性规律性，以及重复性.
          a.push(Math.random());
        }

        return hnv1a(info) + //增加物理维度分流.
          hnv1a([ //增加用户随机性分流.
            document.documentElement.offsetWidth,
            document.documentElement.offsetHeight,
            history.length,
            new Date - _time
          ].join('')) +
          t +
          m +
          hnv1a(a.slice(0, 10).join('')) +
          hnv1a(a.slice(c - 9).join(''));
      };
  })();
  var device = _.getCookie(DEVICE_COOKIE_KEY);
  if (!device) {
    device = genUUID();
    _.setCookie(DEVICE_COOKIE_KEY, device, 365);
  }
  var channel = _.getCookie(CHANNEL_COOKIE_KEY) || '';
  var initTime = now();
  var startTime = now();
  var userId = -1;
  var roomId = -1;
  var roomCategoryID = -1;

  checkChannel()

  function check(opt) {
    if (!opt.c) {
      console.error('[E] 日志统计错误: 未定义`c`字段');
      return false;
    }
    if (!opt.a) {
      console.error('[E] 日志统计错误: 未定义`a`字段');
      return false;
    }
    return true;
  }

  function getPageName(pathname) {
    pathname = pathname || location.pathname;
    var path = pathname.split('/');
    switch (path[1]) {
      case '':
        return 'index';
      case 'game':
        return 'list/' + path[2];
      case 'v':
      case 'star':
        return 'room/' + path[2];
      case 'my':
        var hash = location.hash.split('/');
        return hash[1] || 'my';
      default:
        return path[1];
    }
  }

  function getRoomId() {
    var pathname = location.pathname;
    pathname = pathname.split('/');
    if (pathname[1] == 'v' || pathname[1] == 'star') {
      return pathname[2];
    }
    return -1;
  }

  function genOption(opt) {
    var defaults = {
      p: PLATFORM,
      rid: roomId,
      rcat: roomCategoryID,
      uid: userId,
      net: 0,
      screen: 3,
      device: device,
      refer: getPageName(),
      sw: screen.width,
      sh: screen.height,
      url: window.location.href,
      evtvalue: '',
      evtname: '',
      sCome: sCome,
      fuid: fuid,
      sType: sType,
      room_id: userId,
      device_id: device,
      p:'h5',
      
    };
    if (channel) {
      defaults.ch = channel;
      defaults.cv = channel + "_mobile2"; //客户端将ch写成了cv，后端使用的cv
      defaults.position = channel + "_mobile2"; 
    }
    opt = opt || {};
    for (var key in opt) {
      if (opt.hasOwnProperty(key)) {
        defaults[key] = opt[key];
      }
    }
    if (defaults.uid === -1) {
      defaults.uid = _.getCookie('uid') || -1;
    }
    return defaults;
  }

  function send(opt, block) {
    opt = genOption(opt);
    var url = LOG_API + _.stringify(opt);
    if (block) {
      _.blockSend(url);
    } else {
      _.log(url);
    }
  }

  function checkChannel() {
    var search = location.search;
    if (search) {
      var query = {};
      search = search.substring(1).split('&');
      for (var i = 0; i < search.length; i++) {
        var kv = search[i].split('=');
        query[kv[0]] = decodeURIComponent(kv[1]);
      }
      for (i = 0; i < CHANNEL_QUERY_KEY.length; i++) {
        var key = CHANNEL_QUERY_KEY[i];
        if (query.hasOwnProperty(key)) {
          channel = query[key];
          _.setCookie(CHANNEL_COOKIE_KEY, channel, 90);
          return;
        }
      }
    }
  }

  function now() {
    var d = new Date;
    return d.getTime();
  }

  function getPageNameByUrl(url) {
    url = url || '';
    url = url.replace(/^https?:\/\//, '');
    if (url.indexOf(location.host) > 0) {
      url = url.replace(/^[^\/]+/, ''); // remove host
      url = url.replace(/#.*$/, ''); // remove hash
      url = url.replace(/\?.*$/, ''); // remove search
      url = getPageName(url);
    } else {
      url = url.substring(0, 40);
    }
    return url;
  }

  function getCookies(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
           }
           if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
           }
       }
      return "";
  } 

  var sCome =getCookies('sCome')
  var fuid = getCookies('fuid')
  var sType =getCookies('sType')

  global.logger = {
    evt: function(opt) {
      if (check(opt)) {
        send(opt);
      }
    },
    click: function(info) {
      var opt = {};
      if (typeof info === 'object') {
        opt = info;
        opt.c = opt.c || 'page';
        opt.a = opt.a || 'click';
      } else {
        opt = {
          c: 'page',
          a: 'click',
          v1: info
        };
      }
      send(opt);
    },
    pv: function(opt) {
      var _opt = opt || {};
      checkChannel();
      send({
        c: 'page',
        a: 'view',
        v1: getPageName(),
        refer: getPageNameByUrl(document.referrer),
        prepage: _opt.prepage
      });
    },
    leave: function(pathname) {
      send({
        c: 'page',
        a: 'leave',
        v4: Math.round((now() - startTime) / 1000),
        refer: getPageName(pathname)
      });
      startTime = now();
    },
    getParams: function(opt) {
      opt = genOption(opt);
      return _.stringify(opt);
    },
    setUserId: function(uid) {
      userId = uid || -1;
    },
    setRoomId: function(rid) {
      roomId = rid || -1;
    },
    setRoomCategoryId: function(cid) {
      roomCategoryID = cid || -1;
    }
  };
  var unloaded = false;
  var unload = function() {
    if (unloaded) return;
    unloaded = true;
    send({
      c: 'page',
      a: 'exit',
      v4: Math.round((now() - initTime) / 1000)
    }, false);
  };
  _.on(window, 'beforeunload', unload);
  _.on(window, 'unload', unload);
  _.on(document.documentElement, 'click', function(e) {
    var target = e.target;
    while (target && target.nodeType == 1) {
      if (target.hasAttribute && target.hasAttribute(LOG_CLICK_ATTRIBUTE_NAME)) {
        var info = target.getAttribute(LOG_CLICK_ATTRIBUTE_NAME);
        if (info) {
          try {
            info = JSON.parse(info);
          } catch (e) {}
          logger.click(info);
        }
      }
      target = target.parentNode;
    }
  });
  // window.onerror = function(err, file, line, col) {
  //   try {
  //     //          when in a real context, the error have stack property
  //     //          otherwise we print error filename/line/col to replace
  //     var stack = err.stack ? err.stack : 'file:' + file + ' line:' + line + ' col:' + col;
  //     err = err.message || err;
  //     if (IS_TEST) {
  //       //              alert(err + ' ' + stack);
  //     } else {
  //       logger.evt({
  //         c: 'page',
  //         a: 'error',
  //         v1: err,
  //         v2: stack
  //       });
  //     }
  //   } catch (e) {}
  //   try {
  //     var c = window.console;
  //     if (c && c.error && typeof c === 'function') {
  //       c.error(err);
  //     }
  //   } catch (e) {}
  // };

  
})(window);
