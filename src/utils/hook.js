document.body.addEventListener('click', function(e) {

  const el = e.target
  if (el.tagName !== 'A') {
    return
  }

  const href = el.getAttribute('href')
  if (!href) {
    return
  }

  // if (/zbb/i.test(navigator.userAgent)) {
  //   e.preventDefault()
  //   window.zbbBridge.exec('openWebview', {
  //     url: href
  //   })
  //   return
  // }



});