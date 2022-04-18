import React from 'react'
import SessionContainer from 'components/session-container'
import styles from '@/styles/module/Ins.module.scss'
import { ISessionSame } from 'interface'
import Slider from "react-slick";
import LazyImage from 'components/common/LazyImage'

export type IIns = ISessionSame & {
  backgroundColor: string
  cards: IInsCardItem[]
}

export type IInsCardItem = {
  imgUrl: string
  id: string | number
  actionUrl: string
  label: string
  profilePhoto: string
  profilePhotoAlt: string
  userName: string
  accountId: string
  imgAlt: string
}

const settings = {
  dots: false,
  arrows: true,
  // autoplay: true,
  draggable: true,
  centerMode: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true

}

export default function Ins (
  {
    title = '', 
    titlePosition = 'center',
    marginBottom,
    marginTop,
    backgroundColor,
    cards
  }: IIns) {
  return (
    <div className={styles.box} style={{backgroundColor: backgroundColor || '#f7f7f7'}}>
      <SessionContainer 
        boxClass={styles.container}
        title={title} 
        titlePosition={titlePosition}
        marginBottom={marginBottom}
        marginTop={marginTop}
        >
        <div className={styles.slick}>
          <Slider {...settings}>
            {
              (cards || []).map((card, index) => {
                return (
                  <a className={styles.slickItem} key={card.imgUrl + index} href={card.actionUrl}>
                    <LazyImage
                      boxClass={styles.image} 
                      src={card.imgUrl} 
                      rate='' 
                      alt={card.imgAlt} />
                    <div className={styles.user}>
                      <div className={styles.userAvatar}>
                        <LazyImage 
                          src={card.profilePhoto} 
                          rate="" 
                          alt={card.imgAlt} 
                          isHeightBox={false} />
                      </div>
                      <div>
                        <p className={styles.userName}>{card.userName}</p>
                        <p className={styles.accountId}>{card.accountId}</p>
                      </div>
                    </div>
                  </a>
                )
              })
            }
          </Slider>
      </div>
      </SessionContainer>
    </div>
  )
}