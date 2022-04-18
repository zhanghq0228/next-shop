import React from 'react'
import Link from 'next/link'
import SessionContainer from 'components/session-container'
import styles from '@/styles/module/ImageText.module.scss'
import { ISessionSame } from 'interface'
import LazyImage from 'components/common/LazyImage'

export type IImageText = ISessionSame & {
  btnUrl?: string
  content?: string
  title?:  string
  btnTitle?: string
  imgUrl?: string
  imgAlt?: string
  style?: '1' | '2'  // 1、左图右字  2、左字右图
  textAlign?: 'LEFT' | 'RIGHT' | 'CENTER'
}

export default function CollectionList (
  {
    title = '', 
    titlePosition = 'center',
    marginBottom,
    marginTop,
    btnUrl,
    btnTitle,
    content,
    imgUrl = '',
    imgAlt,
    style = '1',
    textAlign
  }: IImageText) {
  
  const boxCls = style === '1' ? `${styles.rowReverse}` : ''
  return (
    <SessionContainer 
      boxClass={`sp-container`} 
      title=""
      titlePosition={titlePosition}
      marginBottom={marginBottom}
      marginTop={marginTop}
      >
      <div className={`${styles.box} ${boxCls}`}>
        <div className={`${styles.textContainer} text-${(textAlign || '').toLowerCase()}`}>
          <div className={styles.textTitle}>{title}</div>
          <div className={styles.textContent} dangerouslySetInnerHTML={{__html: content || ''}}></div>
          {btnTitle ? <a className={styles.textLink} href={btnUrl || '/'}>{btnTitle}</a> : null}
        </div>
        <div className={styles.imageContainer}>
          <LazyImage
            boxClass={styles.image} 
            src={imgUrl} 
            rate='' 
            alt={imgAlt} />
        </div>
      </div>
    </SessionContainer>
  )
}