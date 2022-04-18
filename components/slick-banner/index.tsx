import React from 'react'
import styles from '@/styles/module/SlickBanner.module.scss'
import SessionContainer from 'components/session-container'
import LazyImage from 'components/common/LazyImage'
import {IObject, ISessionSame} from 'interface'
import Slider from "react-slick";

type ISlickBanner = {
  fullScreen?: boolean
  items: ISlickItem[]
  imgHeight?: string
} & ISessionSame


type ISlickItem = {
  id: number
  imgUrl: string
  imgAlt?: string
  imgUrlMobile?: string
  imgAltMobile?: string
  title?: string
  content?: string
  textAlign?: string
  color?: string
  actionUrl: string
  imgPosition?: string
  imgHeight?: string
  opacity?: number
}

type IHeightRate = {
  [propName: string]: string[]
}

const heightRateMap: IHeightRate = {
  'img-big': ['39%', '58.6%'],
  'img-middle': ['19.5%', '29.3%'],
  'img-small': ['12.9%', '19.4%'],
}

const SlickItem = ({
  imgUrl,
  imgAlt = '',
  imgUrlMobile,
  imgAltMobile,
  title,
  content,
  textAlign = 'center',
  color,
  actionUrl,
  imgPosition = 'img-position-center',
  imgHeight,
  opacity = 0,
}: ISlickItem) => {
  imgHeight = imgHeight || 'img-big'
  const rate: string[] = heightRateMap[imgHeight] || ['12.9%', '19.4%']
  const fontStyle: IObject<string>  = {} 
  if(color) {
    fontStyle.color = color
  }
  const maskStyle: IObject<string | number > = {opacity}
  return (
    <div className={styles.item}>
      <a href={actionUrl}>
        <div className={styles.itemMain}>
          <LazyImage 
            src={imgUrl} 
            rate={rate[0]} 
            alt={imgAlt} 
            boxClass='hidden-md-down'
            imgClass={imgPosition} />
          <LazyImage 
            src={imgUrlMobile || imgUrl} 
            rate={rate[1]} 
            alt={imgAltMobile} 
            boxClass='hidden-md-up'
            imgClass={imgPosition} />
        </div>
        <div className={styles.itemMaskBox}>
          <div className={styles.itemMask} style={maskStyle}></div>
          <div className={`${styles.itemMaskFont} align-${textAlign}`} style={fontStyle}>
            <p className={`sp-skin-title ${styles.itemMaskFontTitle}`}>{title}</p>
            <p>{content}</p>
          </div>
        </div>
      </a>
    </div>
  )
}
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  // autoplay: true,
  draggable: true
}

export default function SlickBanner(
  {
    fullScreen = true, 
    imgHeight, items,
    title = '', 
    titlePosition = 'center',
    marginBottom,
    marginTop
  }: ISlickBanner) {
  const boxCls = `${styles.banner || ''} ${fullScreen ? '' : 'sp-container'} session-slick`
  const children = (items || []).map(item => {
    return (
      <SlickItem {...item} imgHeight={imgHeight} key={item.id} />
    )
  })
  return (
    <SessionContainer 
      boxClass={boxCls} 
      title={title} 
      titlePosition={titlePosition}
      marginBottom={marginBottom}
      marginTop={marginTop}
      >
      <div className={styles.box}>
        {
          (items || []).length > 1 ? (
            <Slider {...settings}>
              {children}
            </Slider>
          ) : (children[0] || null)
        }
      </div>
    </SessionContainer>
  )
}