let lastRequestTime = 0
module.exports = (opt) => {
  if (!opt.onLoadHandler) {
    return
  }
  const onLoadHandler = opt.onLoadHandler;
  window.addEventListener('scroll', () => {
    const wHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if ((scrollTop + wHeight) >= (scrollHeight - 50)) {
      if (Date.now() - lastRequestTime < 1000) {
        return false
      } else {
        lastRequestTime = Date.now()
        typeof onLoadHandler === 'function' && onLoadHandler()
      }
    }
  }, false)
}