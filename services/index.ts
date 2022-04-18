import { IObject } from 'interface'
import absoluteUrl from 'lib/absolute-url'
import { IncomingMessage } from 'http'
import { under2Camal, camel2Under } from 'lib'
type IOptions = {
  params?: IObject<string | number | undefined>
  data?: any
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  headers?: IObject<string>
  body?: string
  errorDefaultData?: any
}

type IRequestOptions = {
  url: string
  coverData?: boolean
  timeout?: number
} & IOptions

type IResopnData<T> = {
  code: number
  msg: string
  data: T
  success?: boolean
}

export default function request<T>(
  {
    url,
    params,
    data,
    headers,
    coverData = true,
    timeout = 2000,
    errorDefaultData,
    ...other
  }: IRequestOptions,
  nextReq?: IncomingMessage
): Promise<IResopnData<T> | unknown> {
  const defaultOptions: IOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const options: IOptions = Object.assign(
    {},
    defaultOptions,
    {
      headers: Object.assign({}, defaultOptions.headers, headers)
    },
    other
  )
  if (options.method === 'POST' && data) {
    const tmp = camel2Under(data)
    options.body = JSON.stringify(tmp)
  }
  let str = ''
  if (params) {
    const tmp = camel2Under(params) as IObject<string | number>
    str = Object.keys(tmp)
      .filter(key => tmp[key])
      .map(key => `${key}=${tmp[key]}`)
      .join('&')
  }
  if (!url.includes('?') && str) {
    url = url + '?'
  }
  url = url + str
  console.log(url, 'url.....')
  if (!url.includes('http')) {
    const { origin } = absoluteUrl(nextReq)
    url = origin + '/backend-api' + url
  }
  return Promise.race([
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() as Promise<IResopnData<T>>
      })
      .then(res => {
        // 接口不规范,暂时注释
        // if (res.code !== 0 || !res.success) {
        //   if (errorDefaultData === undefined) {
        //     throw new Error(JSON.stringify(res))
        //   } else {
        //     res.code = 0
        //     res.data = errorDefaultData
        //   }
        // }
        return under2Camal(res)
      }),
    new Promise((resolve, reject) =>
      setTimeout(() => {
        if (errorDefaultData === undefined) {
          reject(new Error('request timeout'))
        } else {
          resolve({ code: 0, data: errorDefaultData })
        }
      }, timeout)
    )
  ])
}

// function stack(str: string): boolean {
//   const len = str.length
//   if (len === 0) return true
//   const stack = []
//   const leftS = '{[('
//   const rightS = ')]}'
//   for (let i = 0; i < str.length; i++) {
//     const s = str[i]
//     if (leftS.includes(s)) {
//       stack.push(s)
//     }
//     if (rightS.includes(s)) {
//       const top = stack[stack.length - 1] //栈顶元素
//       if (isMatch(top, str[i])) {
//         stack.pop()
//       } else {
//         return false
//       }
//     }
//   }

//   return stack.length === 0
// }

// function isMatch(left, right) {
//   if (left === '[' && right === ']') return true
//   if (left === '{' && right === '}') return true
//   if (left === '(' && right === ')') return true
//   return false
// }
