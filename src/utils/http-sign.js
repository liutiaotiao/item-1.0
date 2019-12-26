import axios from 'axios'
import { xsignForJava, xsignForPhp } from './sign'

const toQueryString = function(data) {
  return Object.keys(data).reduce((ret, cur) => {
    ret.push(`${cur}=${data[cur]}`)
    return ret
  }, []).join('&')
}

const extraQueryToMap = function(url) {
  if (url.indexOf('?') === -1) {
    return null
  }
  return url.split('?')[1].split('&').reduce((ret, cur) => {
    const _tmp = cur.split('=')
    ret[_tmp[0]] = _tmp[1]
    return ret
  }, {})
}

const signForJava = (config) => {

  const URL_PARAMS = window.URL_PARAMS
  const method = config.method
  const requestUrl = config.url
  const requiredParams = ['sid', 'uid']

  const opts = requiredParams.filter((item) => {
    return item in URL_PARAMS
  }).reduce((ret, cur) => {
    ret[cur.toLowerCase()] = URL_PARAMS[cur]
    return ret
  }, {})

  const requestQueryObject = extraQueryToMap(config.url)
  const params = Object.assign({}, opts, requestQueryObject)
  const urlWithoutQuery = requestUrl.replace(/\?.+/, '')

  const deviceScreenSize = URL_PARAMS.resolution

  const customHeaders = {
    'X-Os-Version': URL_PARAMS.osversion || '',
    'X-App-Version': URL_PARAMS.version || '',
    'X-App-DeviceId': URL_PARAMS.deviceid || '',
    'X-App-Channel': URL_PARAMS.from || '',
    'X-App-MobileName': URL_PARAMS.model || '',
    'X-App-Platform': URL_PARAMS.platform || '',
    'X-Client-Width': deviceScreenSize ? deviceScreenSize.split('*')[0] : '',
    'X-Client-Height': deviceScreenSize ? deviceScreenSize.split('*')[1] : '',
    'Trace-Id': window.genUUID() + Date.now(),
    'token': URL_PARAMS.token || URL_PARAMS.sid || '',
  }

  const xsignData = {}

  xsignData['X-App-Platform'] = customHeaders['X-App-Platform']

  if (URL_PARAMS.token || URL_PARAMS.sid) {
    xsignData['token'] = customHeaders.token
  }
  
  const signRes = xsignForJava(xsignData, true)
  console.log('sign', xsignData, signRes)

  if (window.VOID_RISK) {
    customHeaders['Void-Risk'] = true
  }
  config.headers = Object.assign({}, config.headers[method], customHeaders, signRes)

  switch (method) {
    case 'get':
      // config.url = `${urlWithoutQuery}?${toQueryString(params)}`
      break
    case 'post':
      // config.url = `${urlWithoutQuery}?${toQueryString(params)}`
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.data = config.data || {}
      break;
    default:
      break;
  }

  return config

}

const signForPhp = (config) => {

  const URL_PARAMS = window.URL_PARAMS
  const method = config.method
  const requestUrl = config.url
  const requiredParams = ['sid', 'uid']

  const opts = requiredParams.filter((item) => {
    return item in URL_PARAMS
  }).reduce((ret, cur) => {
    ret[cur.toLowerCase()] = URL_PARAMS[cur]
    return ret
  }, {})

  const requestQueryObject = extraQueryToMap(config.url)
  const params = Object.assign({}, opts, requestQueryObject)
  const urlWithoutQuery = requestUrl.replace(/\?.+/, '')

  const deviceScreenSize = URL_PARAMS.resolution

  const customHeaders = {
    'X-Os-Version': URL_PARAMS.osversion || '',
    'X-App-Version': URL_PARAMS.version || '',
    'X-App-DeviceId': URL_PARAMS.deviceid || '',
    'X-App-Channel': URL_PARAMS.from || '',
    'X-App-MobileName': URL_PARAMS.model || '',
    'X-App-Platform': URL_PARAMS.platform || '',
    'X-Client-Width': deviceScreenSize ? deviceScreenSize.split('*')[0] : '',
    'X-Client-Height': deviceScreenSize ? deviceScreenSize.split('*')[1] : '',
    'trace-id': window.genUUID() + Date.now(),
  }

  if (window.VOID_RISK) {
    customHeaders['Void-Risk'] = true
  }

  config.headers[method] = Object.assign({}, config.headers[method], customHeaders)

  switch (method) {
    case 'get':
      config.url = `${urlWithoutQuery}?${xsignForPhp(method, urlWithoutQuery, params)}`
      break
    case 'post':
      // query中加的 pass_sign=1 是为了解决沙雕php验签失败的问题。其实填fuck_sign fuck_php 也行。🙄
      // by : wilsonx
      const postData = xsignForPhp(method, urlWithoutQuery + '?pass_sign=1', Object.assign({}, config.data, params), true)
      config.url = urlWithoutQuery + '?pass_sign=1'
      config.data = toQueryString(postData)
      break;
    default:
      break;
  }

  return config

}

axios.interceptors.request.use(config => {
  return config
})


axios.interceptors.response.use((res) => {

  if (res.config.url.indexOf('/udata/udata') >= 0 && 200 === res.status && 0 === res.data.errno) {
    return res.data.data
  }
  if (res && res.status === 200 && res.data.code === 0|| res.data.code === 200) {
    return res.data.data
  }
  console.error(`[http] error \n${res.config.url} \nmessage : ${res.data.message||'encounter error'}`)
  return Promise.reject(res.data)
})