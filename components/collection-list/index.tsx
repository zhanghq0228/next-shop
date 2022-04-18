import React from 'react'
import Link from 'next/link'
import SessionContainer from 'components/session-container'
import styles from '@/styles/module/Collections.module.scss'
import { ISessionSame } from 'interface'
import LazyImage from 'components/common/LazyImage'

export type ICollections = ISessionSame & {
  imgRateHeight: string
  items: ICollectionsItem[]
  oneRowsNum?:  number | string
}

export type ICollectionsItem = {
  collectionImageUrl: string
  title: string
  seoUrl: string
} 

export default function CollectionList (
  {
    title = '', 
    titlePosition = 'center',
    marginBottom,
    marginTop,
    oneRowsNum = '3',
    items,
    imgRateHeight
  }: ICollections) {
  return (
    <SessionContainer 
      boxClass={`${styles.container || ''} sp-container`} 
      title={title} 
      titlePosition={titlePosition}
      marginBottom={marginBottom}
      marginTop={marginTop}
      >
      <ul className={styles.box}>
        {
          (items || []).map((item, index) => {
            return (
              <li className={`${styles.item} col-md-12 row-${oneRowsNum}`} key={item.seoUrl + index}>
                <Link href={item.seoUrl || '/'}>
                  <a>
                    <LazyImage 
                      src={item.collectionImageUrl} 
                      rate={imgRateHeight === '1' ? '' : imgRateHeight} 
                      imageMode="height"
                      />
                    <p className={styles.itemTitle}>{item.title}</p>
                  </a>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </SessionContainer>
  )
}