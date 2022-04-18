import request from './index'
import { IObject } from 'interface'

export const getModal = (req: any) =>
  request({ url: '/api/v1/test/getModel' }, req)

export const getHeaderMenuData = (req: any, menuId: number) => {
  if (!menuId) {
    return Promise.resolve({ code: 0, data: [] })
  }
  return request(
    {
      url: `/api/v1/test/getHeader?menuId=${menuId}`,
      errorDefaultData: []
    },
    req
  )
}

export const getFooterMenuData = (req: any, ids: string) => {
  if (!ids) {
    return Promise.resolve({ code: 0, data: [] })
  }
  return request(
    {
      url: `/api/v1/test/getFooter?ids=${ids}`,
      errorDefaultData: []
    },
    req
  )
}

export const getCollections = (req: any, ids: string) => {
  if (!ids) {
    return Promise.resolve({ code: 0, data: [] })
  }
  return request(
    {
      url: `/api/v1/test/getCollections?collectionIds=${ids}`,
      errorDefaultData: []
    },
    req
  )
}

export const postSubScriptEamil = (data: any) => {
  return request({
    url: '/api/v1/customer/email',
    method: 'POST',
    data
  })
}
