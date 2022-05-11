// @ts-nocheck
import React, {
  useState,
  useCallback,
  ChangeEvent,
  useRef,
  useEffect,
  MutableRefObject
} from 'react'
export const under2Camal = (obj: any) => {
  const str = JSON.stringify(obj).replace(
    /"([^"]+)":/g,
    (_, catched) =>
      `"${catched.replace(/_+(.)/g, (__: any, letter: string) =>
        letter.toUpperCase()
      )}":`
  )
  return JSON.parse(str)
}
//
export const camel2Under = (target: any): any => {
  if (typeof target === 'string') {
    return target.replace(
      /([a-z0-9])([A-Z])/g,
      (_, letter1, letter2) => `${letter1}_${letter2.toLowerCase()}`
    )
  }
  if (target instanceof Array) {
    return target.map(item => camel2Under(item))
  }
  if (typeof target === 'object' && target !== null) {
    const resultObj = {}
    Object.keys(target).forEach(key => {
      const newkey = camel2Under(key)
      let value = target[key]
      if (typeof value === 'object' && !(value instanceof Array)) {
        value = camel2Under(target[key])
      } else if (
        value instanceof Array &&
        value.length > 0 &&
        typeof value[0] !== 'string'
      ) {
        value = camel2Under(target[key])
      }
      Object.assign(resultObj, {
        [newkey]: value
      })
    })
    return resultObj
  }
  return target
}
export function useInputValue(
  initialValue?: string | number,
  changeFn = (event?: ChangeEvent | string) => {}
) {
  let [value, setValue] = useState(initialValue)
  let onChange = useCallback(function (event) {
    let value = event
    if (typeof event === 'object') {
      value = event.currentTarget.value
    }
    setValue(value)
    changeFn && changeFn(value)
  }, [])

  return {
    value,
    onChange
  }
}
export function useCurrentData(data: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = data
  }, [data])
  return ref
}
export const thousandNum = (num: number, splitStr = ','): string => {
  if (typeof num !== 'number') return ''
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + splitStr
    })
  })
}

export const getQueryParams = (url: string | null) => {
  url = url || location.search
  const splitList: string[] = url.split('?')
  url = splitList[1] || ''
  const params: string = url
    .split('&')
    .filter(Boolean)
    .reduce((obj, item) => {
      const [key, value] = item.split('=')
      const val = decodeURIComponent(value)
      if (Array.isArray(obj[key])) {
        obj[key].push(val)
      } else if (typeof obj[key] === 'string') {
        obj[key] = [obj[key], val]
      } else {
        obj[key] = val
      }
      return obj
    }, {})
  return params
}

export const fixUrl = (url: string | null, params: {} | null) => {
  if (!params) return url
  let urlParams = getQueryParams(url)
  urlParams = Object.assign({}, urlParams, params)
  const paramsList = Object.keys(urlParams).map(
    key => key + '=' + urlParams[key]
  )
  url = url.split('?')[0] + '?' + paramsList.join('&')
  return url
}
