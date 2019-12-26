function myAjax(options) {
  options = options || {}
  options.type = (options.type || 'GET').toUpperCase()
  options.dataType = options.dataType || 'json'
  var params = formatParams(options.data)
  var headers = formatParams(options.headers)

  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest()
  } else {
    var xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var status = xhr.status
      if (status >= 200 && status < 300) {
        options.success && options.success(JSON.parse(xhr.responseText), xhr.responseXML)
      } else {
        options.fail && options.fail(status)
      }
    }
  }

  if (options.type == 'GET') {
    // xhr.open('GET', '', true)
    xhr.open('GET', options.url, true)
    // 设置头信息
    var headersArr = headers.split('&')
    headersArr.length &&
      headersArr.forEach(item => {
        xhr.setRequestHeader(item.split('=')[0], item.split('=')[1])
      })
    xhr.send(null)
  } else if (options.type == 'POST') {
    xhr.open('POST', options.url, true)
    // 设置头信息
    var headersArr = headers.split('&')
    headersArr.length &&
      headersArr.forEach(item => {
        xhr.setRequestHeader(item.split('=')[0], item.split('=')[1])
      })
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
  }
}
//格式化参数
function formatParams(data) {
  var arr = []
  for (var name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  }
  return arr.join('&')
}

export default myAjax
