import Config from '../config/app.js'

const baseSize = 100;
const ua = navigator.userAgent

function setFontSize() {
  let rootFontSize
  const scale = (document.documentElement.clientWidth / Config.designSize)
  rootFontSize = (baseSize * scale)

  if (/sm-[a-z]\d+/i.test(ua)) {
    rootFontSize -= 5
  }

  document.documentElement.style.fontSize = rootFontSize+'px'
  
  setTimeout(() => {
    logger.evt({
      c: 'page',
      a: 'reseize',
      carrier: 'page',
      action: 'reseize',
      verify: 'rootFontSize',
      rootFontSize: document.documentElement.style.fontSize || window.getComputedStyle(document.documentElement)['fontSize'],
      dpr: window.devicePixelRatio, 
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      screenAvailWidth: window.screen.availWidth,
      screenAvailHeight: window.screen.availHeight,
      nativeResolution: window.screen.width * window.devicePixelRatio,
      env: 'test',
    }) 
    // set root font size need time
  }, 200)
}

  /**
    网页可见区域宽： document.body.clientWidth
    网页可见区域高： document.body.clientHeight
    网页可见区域宽： document.body.offsetWidth (包括边线的宽)
    网页可见区域高： document.body.offsetHeight (包括边线的高)
    网页正文全文宽： document.body.scrollWidth
    网页正文全文高： document.body.scrollHeight
    网页被卷去的高： document.body.scrollTop
    网页被卷去的左： document.body.scrollLeft
    网页正文部分上： window.screenTop
    网页正文部分左： window.screenLeft
    屏幕物理分辨率的高： window.screen.height
    屏幕物理分辨率的宽： window.screen.width
    屏幕可用工作区高度： window.screen.availHeight
    屏幕可用工作区宽度： window.screen.availWidth

    屏幕缩放因子：window.devicePixelRatio

    屏幕逻辑分辨率：window.screen.width * window.devicePixelRatio (缩放因子与物理分辨率的乘积)
   */

export function setHtmlFontSize() {
  // 初始化
  setFontSize();
  // 改变窗口大小时重新设置 fontSize
  window.onresize = function() {
    setFontSize();
  }
}