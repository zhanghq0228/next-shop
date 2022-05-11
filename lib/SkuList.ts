// @ts-nocheck
export default class SkuSelect {
  groupAttrs: Array<number> = [] // sku属性
  skuList: Array<number> = [] // 可购买的 sku 属性
  available: Array<number> = [] // 可购买
  excludes: object = {} // 不可购买

  init(group_attrs: Array<number>, sku_list: Array<number>): void {
    this.groupAttrs = group_attrs
    this.skuList = sku_list.sort()

    this.available = this.groupAttrs.reduce(
      (total, current) => [...total, ...current],
      []
    )
    // const query = searchArr
    // .reduce((accumulator, currentValue) => {
    //     const [key, value] = currentValue.split('=')
    //     accumulator[key] = value
    //     return accumulator
    // }, {} as { [key: string]: any });
    this.excludes = this.getCompleteExcludes()
  }

  getCompleteExcludes() {
    const skuList = this.skuList.reduce(
      (total, current) => [...total, ...current],
      []
    )

    return Array.from(
      new Set(
        this.available
          .map(item => !skuList.includes(item) && item)
          .filter(Boolean)
      )
    )
  }

  queryAvailable(selected) {
    console.log(selected)
    let unavailable = this.getUnavailable()

    if (unavailable.length === 0) {
      return this.available
    }

    let excludes = Array.from(this.excludes)
    let available = Array.from(this.available)

    if (selected.some(Boolean) && this.groupAttrs.length > 1) {
      if (this.groupAttrs.length - selected.length === 1) {
        unavailable.forEach(item => {
          let exclude = item
            .map(v => !selected.includes(v) && v)
            .filter(Boolean)

          if (exclude.length === 1) {
            excludes = excludes.concat(exclude)
          }
        })
      } else if (this.groupAttrs.length === selected.length) {
        let selectedCombine = this.getSelectedCombine(selected)

        unavailable.forEach(v => {
          selectedCombine.forEach(c => {
            let exclude = v
              .map(item => !c.includes(item) && item)
              .filter(Boolean)

            if (exclude.length === 1) {
              excludes = excludes.concat(exclude)
            }
          })
        })
      }

      excludes = Array.from(new Set(excludes))
    }

    return this.getAvailable(available, excludes)
  }

  getSelectedCombine(selected) {
    let results = []

    let len = selected.length

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        let result = []

        result.push(selected[i], selected[j])
        results.push(result)
      }
    }

    return results
  }

  getAvailable(data, excludes) {
    excludes.forEach(item => {
      let index = data.indexOf(item)

      if (index !== -1) {
        data.splice(index, 1)
      }
    })

    return data
  }

  getUnavailable() {
    return this.getDiffArray(this.calcDescartes(this.groupAttrs), this.skuList)
  }

  calcDescartes(array) {
    if (array.length < 2) return array[0] || []

    return [].reduce.call(array, function (col, set) {
      let res = []

      col.forEach(function (c) {
        set.forEach(function (s) {
          let t = [].concat(Array.isArray(c) ? c : [c])
          t.push(s)
          res.push(t)
        })
      })

      return res
    })
  }

  getDiffArray(full_sku_list, this_sku_list) {
    console.log(full_sku_list)
    full_sku_list.map(subArr => subArr.sort())

    let unavailable = []

    full_sku_list.forEach(sArr => {
      if (
        typeof this_sku_list.find(
          item => item.toString() === sArr.toString()
        ) === 'undefined'
      ) {
        unavailable.push(sArr)
      }
    })

    return unavailable
  }
}
