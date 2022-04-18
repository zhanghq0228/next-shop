import React from 'react'
import Link from 'next/link'
import SessionContainer from 'components/session-container'
import styles from '@/styles/module/ThreePic.module.scss'
import { ISessionSame } from 'interface'
import LazyImage from 'components/common/LazyImage'

export type IThreePic = ISessionSame & {
  style: "1" | "2" | "3" | "4"
  image1: IThreePicItem
  image2: IThreePicItem
  image3: IThreePicItem
}

export type IThreePicItem = {
  actionUrl?: string
  imgAlt?: string
  imgUrl?: string
  index?: string
  boxCls?: string
  imgCls?: string
  [propName: string]: any
} 

const ImageLink = (
  {
    actionUrl,
    imgUrl = '',
    imgAlt,
    boxCls,
    imgCls,
    ...other
  }: IThreePicItem
) => {
  return (
    <div className={`${styles.itemBox} ${boxCls}`}>
      <Link href={actionUrl || "/"}>
        <a>
          <LazyImage
            boxClass={`${imgCls || ''} ${styles.threePicImg}`} 
            src={imgUrl} 
            rate='' 
            alt={imgAlt}
            
            {...other} />
        </a>
      </Link>
    </div>
    
  )
}

export default function ThreePic (
  {
    title = '', 
    titlePosition = 'center',
    marginBottom,
    marginTop,
    image1,
    image2,
    image3,
    style
  }: IThreePic) {
  return (
    <SessionContainer 
      boxClass={`${styles.container || ''} sp-container`} 
      title={title} 
      titlePosition={titlePosition}
      marginBottom={marginBottom}
      marginTop={marginTop}
      >
      <div className={`${styles.box} ${styles['style3']}`}>
        <ImageLink 
          {...image1} 
          boxCls={styles.image1Box} 
          imgCls={styles.image1}
          imageMode="cover"/>
        <ImageLink 
          {...image2} 
          boxCls={styles.image2Box} 
          imgCls={styles.image2}
          imageMode="cover"/>
        <ImageLink 
          {...image3} 
          boxCls={styles.image3Box} 
          imgCls={styles.image3}
          imageMode="cover"/>
      </div>
    </SessionContainer>
  )
}