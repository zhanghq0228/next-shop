const init = function (): void {
  console.log(1233)
  const whdef: number = 100 / 1920
  let wW: number = document.documentElement.clientWidth
  let rem: number
  let layoutId: string = 'pc-layout'
  if (wW <= 1040) {
    let dpr: number = 0,
      scale: number = 0

    if (!dpr && !scale) {
      const isAndroid = window.navigator.appVersion.match(/android/gi)
      const isIPhone = window.navigator.appVersion.match(/iphone/gi)
      const devicePixelRatio = window.devicePixelRatio
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
  let p: Element | null = document.querySelector('#htmlStyle') || null
  document.body.id = layoutId
  document.documentElement.style.fontSize = rem + 'px'
  if (p) {
    p.innerHTML = 'html{font-size: ' + rem + 'px}'
  }
}
if (typeof window !== undefined) {
  try {
    init()
    window.addEventListener('resize', init)
  } catch (e) {}
}

export default {}
