declare namespace Detail {
  interface Imgs {
    original: string
    thumbnail?: string
    position: number
  }
  interface optionsValue {
    id: string
    value: string
    img?: string
  }
  interface Options {
    isImgValue?: boolean
    name: string
    values: optionsValue[]
  }

  interface ProductDescription {
    id: string
    seoUrl: string
    title: string
    vendor: string
    salePrice: string
    crossedPrice: string
    currency: string
    imgs: Imgs[]
    options: Options[]
  }
}
