declare namespace ProductList {
  interface Variants {
    id: string
    skuCode: string
    optionValueNames: string
    optionValueIds: string
    isDeleted: string
  }

  interface List {
    data: {
      id: string
      title: string
      seoTitle: string
      thumbnail: string
      jumpUrl?: string
      salePrice: number
      compareAtPrice?: number
      maxSalePrice?: number
      commentAvgStar?: number
      commentNum?: number
      variants?: Variants[]
    }[]
  }
}
