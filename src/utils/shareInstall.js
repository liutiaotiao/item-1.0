export default (domId) => {
  const oScript = document.createElement('script')
  oScript.setAttribute('src', `https://www.shareinstall.com.cn/js/page/jshareinstall.min.js?v=${Date.now()}`)
  document.documentElement.appendChild(oScript)
  window.setTimeout(() => {
    const params = ShareInstall && ShareInstall.parseUrlParams()
    new ShareInstall(
      {
        appKey: '7RBK277EHBKBBF',
        preferInstall: true,
        preferWakeup: true,
        onready: function() {
          const button = document.getElementById(domId)
          button.onclick = () => {
            this.wakeupOrInstall()
          }
        }
      },
      params
    )
  }, 1000)
}