import React from 'react'
import SessionContainer from 'components/session-container'
import styles from '@/styles/module/ProductList.module.scss'
import { IObject, ISessionSame } from 'interface'

type IProductList = ISessionSame & {
  list: number | string
  rowsNum?: number
  oneRowsNum?: number
  imgRateHeight?: string
}

function ProductItem({}) {
  return <li className={styles.productItem}>item</li>
}

export default function ProductList({
  title = '',
  titlePosition = 'center',
  marginBottom,
  marginTop,
  rowsNum = 2,
  oneRowsNum = 4,
  imgRateHeight = '100%'
}: IProductList) {
  return (
    <SessionContainer
      boxClass={`${styles.product} sp-container`}
      title={title}
      titlePosition={titlePosition}
      marginBottom={marginBottom}
      marginTop={marginTop}
    >
      {null}
    </SessionContainer>
  )
}
