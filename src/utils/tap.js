(function(window, document) {
  const mouseUpHandler = function(e) {
    const el = e.currentTarget
    el.style['filter'] = 'initial'
    el.removeEventListener('touchstart', mouseUpHandler)
  }
  document.addEventListener('touchstart', function(e) {
    const el = e.srcElement
    if (el.getAttribute('data-react-tap') !== null) {
      el.style['filter'] = 'contrast(.8)'
      el.addEventListener('touchend', mouseUpHandler);
    }
  })
})(window, document)