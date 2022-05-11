import request from './index'
export const getCollectionsList = (urls: string, params: any = {}) =>
  request({ url: `/api/v1/test/collections/${urls}`, params, method: 'GET' })
