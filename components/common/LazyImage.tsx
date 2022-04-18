import styles from '@/styles/module/LazyImage.module.scss'
import React, { ReactNode } from 'react'

type Props = {
  src: string
  rate: string
  alt?: string
  boxClass?: string
  isClsRate?: boolean
  children?: ReactNode
  imgClass?: string
  isHeightBox?: boolean
  imageMode?: 'height' | 'width' | 'center' | 'cover'
}

export default function LazyImage({
  src,
  rate = '100%',
  alt,
  boxClass,
  imgClass = '',
  children,
  isClsRate = false,
  imageMode = 'width'
}: Props) {
  const other = { alt }
  const style = isClsRate || !rate ? {} : { paddingBottom: rate }
  const cls = !rate ? styles.boxOrigin : styles.boxRate
  return (
    <div
      className={`${cls} img-box ${boxClass || ''} ${
        styles.box
      } ${imageMode}-box`}
      style={style}
    >
      <img
        data-src={src}
        className={`lazyload ${styles.img} ${imgClass} `}
        src="//img.algobuy.net/product/907b7c94e6d54af58fde7d3560df434f.jpg"
        {...other}
      />
      {children}
    </div>
  )
}
