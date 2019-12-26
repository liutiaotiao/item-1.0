const noop = () => {}
const defaultOpt = { distance: 50, onmore: noop }
let lastTime = 0
export default (opt) => {
  let distance = opt.distance || defaultOpt.distance; //距离视窗还用50的时候，开始触发；
  let onmore = opt.onmore || defaultOpt.onmore
  window.addEventListener('scroll', function() {
    let clientHeight = document.body.clientHeight; //浏览器高度
    let scrollHeight = document.body.scrollHeight;
    let scrollTop = document.body.scrollTop;
    if ((scrollTop + clientHeight) >= (scrollHeight - distance)) {
      if (Date.now() - lastTime < 500) {
        return false
      } else {
        lastTime = Date.now()
        typeof onmore === 'function' && onmore()
      }
    }
  }, false)
}