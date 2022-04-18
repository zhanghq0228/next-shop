import React from 'react'
import Link from 'next/link'
import SessionContainer from 'components/session-container'
import styles from '@/styles/module/TwoPic.module.scss'
import { ISessionSame } from 'interface'
import LazyImage from 'components/common/LazyImage'

export type ITwoPic = ISessionSame & {
  style: "1"
  image1: ITwoPicItem
  image2: ITwoPicItem
}

export type ITwoPicItem = {
  actionUrl?: string
  imgAlt?: string
  imgUrl?: string
  index?: string
} 

export default function TwoPic (
  {
    title = '', 
    titlePosition = 'center',
    marginBottom,
    marginTop,
    image1,
    image2
  }: ITwoPic) {
  return (
    <SessionContainer 
      boxClass={`${styles.container || ''} sp-container`} 
      title={title} 
      titlePosition={titlePosition}
      marginBottom={marginBottom}
      marginTop={marginTop}
      >
      <div className={styles.box}>
        <Link href={image1.actionUrl || '/'}>
          <a className={styles.item}>
            <LazyImage
              boxClass={styles.image1} 
              src={image1.imgUrl || ''} 
              rate='' 
              alt={image1.imgAlt} />
          </a>
        </Link>
        <Link href={image2.actionUrl || '/'}>
          <a className={styles.item}>
            <LazyImage
              boxClass={styles.image2} 
              src={image2.imgUrl || ''} 
              rate='' 
              alt={image2.imgAlt} />
          </a>
        </Link>
      </div>
    </SessionContainer>
  )
}