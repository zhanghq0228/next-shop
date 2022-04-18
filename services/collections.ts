import request from './index'
export const getCollectionsList = (urls: string) =>
  request({ url: `/api/v1/test/collections/${urls}`, method: 'GET' })
