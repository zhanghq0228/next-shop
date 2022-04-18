import request from './index'
const priceMap = {}
const inventryMap = {}
export const getDetailList = (urls: string) =>
  request({ url: `/api/v1/products/${urls}`, method: 'GET' })

export const getDiscount = (id: string) =>
  request({ url: `/api/v2/products/${id}/discount`, method: 'GET' })

export const getVariantInventory = (productId: string) =>
  request({
    url: `/api/v1/products/${productId}/variant/inventory`,
    method: 'GET'
  })
export const getVariantPrice = (productId: string) =>
  request({ url: `/api/v1/products/${productId}/variant/price`, method: 'GET' })
