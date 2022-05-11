// @ts-nocheck

import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import styles from '@/styles/module/LazyImage.module.scss'
// webp
const isSupportWebp = function () {
  try {
    return (
      document
        .createElement('canvas')
        .toDataURL('image/webp', 0.5)
        .indexOf('data:image/webp') === 0
    )
  } catch (err) {
    return false
  }
}
const _isSupportWebp = isSupportWebp()
const transformWebp = function (el: any, keys: string[]) {
  keys.forEach(key => {
    const dataSrc = el.getAttribute(key)
    const containDomain = 'algobuy.net'
    let suffix = '?imageMogr2/strip'
    if (_isSupportWebp) {
      suffix += '/format/WEBP/quality/75!'
    }
    suffix += '/ignore-error/1'
    if (
      dataSrc &&
      dataSrc.indexOf('?') === -1 &&
      dataSrc.indexOf(suffix) === -1 &&
      dataSrc.indexOf(containDomain) > -1
    ) {
      el.setAttribute(key, dataSrc + suffix)
    }
  })
}

if (typeof window !== undefined) {
  try {
    document.addEventListener('lazybeforeunveil', function (e) {
      const target: EventTarget | null = e.target

      transformWebp(target, [
        'data-src',
        'data-img',
        'data-large-image',
        'data-small-image'
      ])
    })
    document.addEventListener(
      'error',
      ({ target }) => {
        // handle your error
        if (
          target &&
          target.tagName &&
          target.tagName.toLowerCase() === 'img' &&
          target.className.includes(styles.lazyImg)
        ) {
          const parentNode = target.parentNode
          parentNode.className += ' ' + styles.lazyloadErrorBox
        }
      },
      true
    )
  } catch (e) {}
}
