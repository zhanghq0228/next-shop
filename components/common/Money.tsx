import React, { useEffect } from 'react'

type Props = {
  classS?: string
  saleprice: number | string | undefined
  originalprice: number | string | undefined
}
export default function Money({ classS, saleprice, originalprice = 0 }: Props) {
  const globalProductConfig = {
    showOldPrice: true
  }
  // useEffect(() => {
  //   console.log(originalprice, saleprice)
  // }, [saleprice, originalprice])

  return (
    <div className={classS}>
      {saleprice && (
        <span
          className="common-money money skin-new-price skin-letter-spacing s-p-color sale-price-js"
          data-money={saleprice}
          data-currencysymbol="$"
        >
          <span>{saleprice}</span>
        </span>
      )}

      {globalProductConfig.showOldPrice && originalprice > 0 && (
        <span
          className="common-money money old-money skin-old-price skin-letter-spacing o-p-color original-price-js"
          data-money={originalprice}
          data-currencysymbol="$"
        >
          <span>{originalprice}</span>
        </span>
      )}
    </div>
  )
}

// ${
//   globalProductConfig.showOldPrice ? '' : 'hide'
// }
