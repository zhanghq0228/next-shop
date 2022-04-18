import React, { ReactNode } from 'react'

type Props = {
  classS?: string
  saleprice: number | string | undefined
  originalprice: number | string | undefined
}
export default function Money({ classS, saleprice, originalprice }: Props) {
  const globalProductConfig = {
    showOldPrice: true
  }
  return (
    <div className={classS}>
      {saleprice && (
        <div
          className="common-money money skin-new-price skin-letter-spacing s-p-color sale-price-js"
          data-money={saleprice}
          data-currencysymbol="$"
        >
          <span>{saleprice}</span>
        </div>
      )}

      {globalProductConfig.showOldPrice && originalprice && (
        <div
          className="common-money money old-money skin-old-price skin-letter-spacing o-p-color original-price-js"
          data-money={originalprice}
          data-currencysymbol="$"
        >
          <span>{originalprice}</span>
        </div>
      )}
    </div>
  )
}

// ${
//   globalProductConfig.showOldPrice ? '' : 'hide'
// }
