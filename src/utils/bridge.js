(function(window, document) {

  const ua = navigator.userAgent

  let appVer, appVerNum

  if (/tuji/i.test(ua)) {
    appVer = navigator.userAgent.match(/\d+\.\d+\.\d+$/)[0]
    appVerNum = parseInt(appVer.replace(/\./ig, ''))
  }

  const isAndroid = /android/i.test(navigator.userAgent)

  const log = console.log

  const Bridge = function(config) {
    const defaultConfig = {
      prefix: 'tujiBridge://'
    }
    this.messageStore = {}
    this.config = Object.assign({}, defaultConfig, config)
    this.bindEvent()
  }

  Bridge.prototype.bindEvent = function() {
    log('[Bridge] bind global bridge message handler')
    window.__globalBridgeManageHandler = this.bridgeMessageHandler.bind(this)
  }

  Bridge.prototype.bridgeMessageHandler = function(data) {

    let _tmp = null
    let receiveData = {}
    let callbackId = null

    try {
      receiveData = JSON.parse(data)
      callbackId = receiveData.callbackId
    } catch (e) {
      callbackId = data.match(/callback_\d+/)[0]
      _tmp = data.match(/"data":"([^}]+})/im)[1]
      _tmp = JSON.parse(_tmp)
      receiveData.callbackId = callbackId
      receiveData.data = _tmp
    }

    if (/^\d+$/.test(callbackId)) {
      callbackId = 'callbackId_' + callbackId
    }

    if (callbackId in this.messageStore) {
      this.messageStore[callbackId](receiveData.data)
    } else {
      const callbackId = 'callback_' + receiveData.callbackId;
      this.messageStore[callbackId](receiveData.data)
    }

  }


  /*
   * arguments 1 : Map<String,String>
   */
  Bridge.prototype.encode = function(data) {
    return Object.keys(data).reduce((ret, cur) => {
      ret[cur] = encodeURIComponent(data[cur])
      return ret
    }, {})
  }

  Bridge.prototype.exec = function(methodName, options, callback) {
    if (methodName === 'openUrl' && appVerNum >= 203) {
      options = this.encode(options)
    }
    if (methodName === 'roomClose') {
      console.trace()
    }
    const _iframe = document.createElement('iframe')
    _iframe.style['position'] = 'fixed'
    _iframe.style['width'] = '1px'
    _iframe.style['height'] = '1px'
    _iframe.style['top'] = '-10000px'
    _iframe.style['left'] = '-10000px'
    _iframe.src = this.genSrc(methodName, options, callback)
    document.body.appendChild(_iframe)
    setTimeout(() => {
      document.body.removeChild(_iframe, document.body)
    }, 0)
  }

  Bridge.prototype.uuid = function() {
    return 'callback_' + (Math.random() * 1000000 | 0)
  }

  Bridge.prototype.genSrc = function(methodName, options, fn) {
    const callbackId = this.uuid()
    let callback
    if (!options && !fn) {
      throw new Error('Bridge execute error : missing require args , position 3 , callback function')
    }
    if (typeof options !== 'function' && (!fn || typeof fn !== 'function')) {
      throw new Error('Bridge execute error : missing require args , position 3 , callback function')
    }
    if (options && typeof options === 'function') {
      callback = options
    } else {
      callback = fn
    }

    this.messageStore[callbackId] = callback
    let src = `${this.config.prefix}${methodName}?callback_id=${isAndroid?callbackId.split('_')[1]:callbackId}`
    if (options && typeof options === 'object') {
      src += '&' + Object.keys(options).map((key) => {
        return `${key}=${options[key]}`
      }).join('&')
    }
    log(`[Bridge] generate src ${src}`)
    return src.replace(/&$/im, '')
  }

  window.tujiJSBridge = new Bridge()

})(window, document);