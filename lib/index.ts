import React, {useState, useCallback, ChangeEvent, useRef, useEffect, MutableRefObject} from 'react'
export const under2Camal = (obj: any) => {
  const str = JSON.stringify(obj)
    .replace(/"([^"]+)":/g, (_, catched) => `"${catched.replace(/_+(.)/g, (__: any, letter: string) => letter.toUpperCase())}":`)
  return JSON.parse(str)
}
// 
export const camel2Under = (target: any): any => {
  if (typeof target === 'string') {
    return target
      .replace(/([a-z0-9])([A-Z])/g, (_, letter1, letter2) => `${letter1}_${letter2.toLowerCase()}`)
  } if (target instanceof Array) {
    return target.map(item => camel2Under(item))
  } if (typeof target === 'object' && target !== null) {
    const resultObj = {}
    Object.keys(target).forEach((key) => {
      const newkey = camel2Under(key)
      let value = target[key]
      if (typeof value === 'object' && !(value instanceof Array)) {
        value = camel2Under(target[key])
      } else if (value instanceof Array && value.length > 0 && typeof value[0] !== 'string') {
        value = camel2Under(target[key])
      }
      Object.assign(resultObj, {
        [newkey]: value,
      })
    })
    return resultObj
  }
  return target
}
export function useInputValue(initialValue?: string | number, changeFn = (event?: ChangeEvent | string) => {}) {
  let [value, setValue] = useState(initialValue);
  let onChange = useCallback(function(event) {
    let value = event
    if(typeof event === 'object') {
      value = event.currentTarget.value
    }
    setValue(value);
    changeFn && changeFn(value)
  }, []);

  return {
    value,
    onChange
  };
}
export function useCurrentData(data: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = data
  }, [data])
  return ref
}