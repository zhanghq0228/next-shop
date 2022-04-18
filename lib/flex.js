function init() {
  var whdef = 100 / 1920
  var wW = document.documentElement.clientWidth
  var rem
  var layoutId = 'pc-layout'
  if (wW <= 1040) {
    let dpr = 0,
      scale = 0

    if (!dpr && !scale) {
      var isAndroid = window.navigator.appVersion.match(/android/gi)
      var isIPhone = window.navigator.appVersion.match(/iphone/gi)
      var devicePixelRatio = window.devicePixelRatio
      if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
          dpr = 3
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
          dpr = 2
        } else {
          dpr = 1
        }
      } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1
      }
      scale = 1 / dpr
    }
    // if (wW > 750) {
    //   wW = 750;
    // }
    if (wW / dpr > 540) {
      wW = 540 * dpr
    }
    rem = wW / 10
    layoutId = 'mobile-layout'
  } else if (wW <= 1920) {
    rem = wW * whdef
  } else {
    rem = 100
  }
  var p = document.querySelector('#htmlStyle')
  document.body.id = layoutId
  document.documentElement.style.fontSize = rem + 'px'
  p.innerHTML = 'html{font-size: ' + rem + 'px}'
}

init()
window && window.addEventListener('resize', init)
