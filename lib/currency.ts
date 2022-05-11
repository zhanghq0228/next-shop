/* eslint-disable no-template-curly-in-string */
// @ts-nocheck

import { getCurrency } from '../services/common'

import { thousandNum } from './index'
import { Emitter } from './emitter'

interface Currencies {
  currency: string
  rate: number
  is_default: number
  currency_format: CurrencyMap
}

type CurrencyMap = {
  decimal_mark?: string
  thousands_separator?: string
  symbol?: string
  format?: string
}

type Default = {
  round_integer: boolean
  currencies: Currencies[]
}

const DEFAULT_CURRENCYOBJ: Default = {
  round_integer: false,
  currencies: [
    {
      currency: 'USD',
      rate: 1.0,
      is_default: 1,
      currency_format: {
        decimal_mark: '.',
        thousands_separator: ',',
        symbol: '$',
        format: '${{amount}}'
      }
    }
  ]
}
class CurrencyManager {
  defaultCurrency: string
  selectCurrency: string
  currencyObj: Default
  currencyMap: CurrencyMap
  eventEmitter: any

  constructor(eventEmitter: any) {
    this.defaultCurrency = 'USD'
    this.selectCurrency = 'USD'
    this.currencyObj = DEFAULT_CURRENCYOBJ
    this.currencyMap = {}

    this.currencyObj.currencies.forEach(item => {
      const currency: string = item.currency
      this.currencyMap[currency] = item
    })
    this.eventEmitter = eventEmitter
  }

  async init() {
    const that = this

    // this.subscribe('set-currency', function (params) {
    //   $('.common-money').each(function (index, item) {
    //     that.setMoneyElem(this)
    //   })
    // })

    try {
      const res: any = await getCurrency()
      if (res.code === 0) {
        res.data = res.data || DEFAULT_CURRENCYOBJ
        if (Array.isArray(res.data)) {
          res.data = DEFAULT_CURRENCYOBJ
        }
        const defaultCurrencyObj =
          res.data.currencies.find((i: any) => i.is_default === 1) || {}
        this.currencyObj = res.data
        if (res.data.currencies.length > 0) {
          this.currencyMap = {}
        }
        res.data.currencies.forEach((item: any) => {
          this.currencyMap[item.currency] = item
        })

        // if (!getLocal('currency')) {
        //   setLocal('currency', res.data.default_show_currency || '') // 默认显示币种
        // }
        // setLocal('defaultCurrency', defaultCurrencyObj.currency || '') // 默认结算币种
        // this.selectCurrency =
        //   getLocal('currency') || res.data.default_show_currency

        this.defaultCurrency = defaultCurrencyObj.currency
        window.shopDefaultCurrency = this.defaultCurrency
        if (
          !this.selectCurrency ||
          res.data.currencies.length < 2 ||
          !this.currencyMap[this.selectCurrency]
        ) {
          this.selectCurrency = defaultCurrencyObj.currency
        }

        this.eventEmitter.emit('set-currency', this.selectCurrency)
        return
      }
    } catch (e) {
      console.log(e)
    }
    this.eventEmitter.emit('set-currency', this.selectCurrency || 'USD')
  }

  refresh() {
    this.eventEmitter.emit('set-currency', this.selectCurrency)
  }

  getFormatMoney(money, rateTransform = true, currency) {
    let defaultCurrency = currency || this.defaultCurrency
    let selectCurrencyObj = this.currencyMap[this.selectCurrency] || {}
    let defaultCurrencyObj = this.currencyMap[defaultCurrency] || {}
    if (!rateTransform || !selectCurrencyObj) {
      selectCurrencyObj = defaultCurrencyObj
    }
    const format = (selectCurrencyObj.currency_format || {}).format || ''
    let transformedMoney: string =
      (selectCurrencyObj.rate * money) / defaultCurrencyObj.rate
    if (
      this.currencyObj.round_integer &&
      selectCurrencyObj.currency !== this.defaultCurrency
    ) {
      transformedMoney = thousandNum(+transformedMoney.toFixed(0)) + '.00'
    } else {
      transformedMoney = thousandNum(+transformedMoney.toFixed(2))
    }

    return format.replace('{{amount}}', transformedMoney)
  }

  getMoneyElem(money, renderHtml = false) {
    const value = this.getFormatMoney(money)
    if (renderHtml) {
      return `<span class="common-money" data-money="${money}">${value}</span>`
    }
    return value
  }

  setMoneyElem(el, money) {
    if (money) {
      $(el).data('money', money)
    }
    const originalMoney = $(el).data('money')
    $(el).html(this.getMoneyElem(originalMoney))
  }

  subscribe(name, fn) {
    this.eventEmitter.on(name, fn)
  }
}

export const currencyManager = new CurrencyManager(new Emitter())

// new Emitter()
// currencyManager.subscribe('set-currency', function (currency) {
//   $('.footer-currency-js').text(currency)
// })
