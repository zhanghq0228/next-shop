import React from 'react'
import SessionContainer from 'components/session-container'
import styles from '@/styles/module/Video.module.scss'
import { ISessionSame } from 'interface'
import Slider from "react-slick";
import LazyImage from 'components/common/LazyImage'

export type IVideo = ISessionSame & {
  link: string
}

const imagePlaceholder = '//static.shoplus.net/static/init/video.png'
export default function Video (
  {
    title = '', 
    titlePosition = 'center',
    marginBottom,
    marginTop,
    link
  }: IVideo) {
  return (
    <SessionContainer 
      boxClass={`${styles.box} sp-container`} 
      title={title} 
      titlePosition={titlePosition}
      marginBottom={marginBottom}
      marginTop={marginTop}
      >
      {
        !link ? (
          <LazyImage
            src={imagePlaceholder} 
            rate='' />
        ) : (
          <div className={styles.wrap}>
            <iframe
            src={link}
            allowFullScreen
            allow="autoplay; encrypted-media"
          ></iframe>
          </div>
        )
      }
    </SessionContainer>
  )
}