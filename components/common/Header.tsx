import React from 'react'
import styles from 'styles/module/Header.module.scss'
import Slider from "react-slick";

type IMenuItem = {
  name: string
  url: string
  menuList?: IMenuItem
  type: number
  id: string | number
}

type IMenu = {
  menus: IMenuItem[]
}

type MainProps = {
  logoAlt: string
  logoUrl: string
} & IMenu



type HeaderProps = {
  notice: INotioce
} & MainProps

type INoticeItem = {
  content: string
  url: string
}
type NoticeProps = {
  items: INoticeItem[]
}

type INotioce = {
  isShow: boolean
  onlyHomepage: boolean
  contentArr: INoticeItem[]
}
function Notice({ items }: NoticeProps) {
  var settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }
  return (
    <div className={styles.notice}>
      <Slider {...settings}>
        {
          items.map(item => (
            <div className={styles.noticeItem} key={item.content}>
              <a href={item.url}>
                {item.content}
              </a>
            </div>
          ))
        }
      </Slider>
    </div>
  )
}

function Menus({ menus }: IMenu) {
  return (
    <div className="flex justify-center sp-container">
      <ul className={`flex justify-center ${styles.menus}`}>
        {
          menus.map((i, index) => {
            return (
              <li key={i.name + i.url + index} className={styles.menusItem}>
                <a href={i.url}>{i.name}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}


function HeaderMain({ logoAlt, logoUrl, menus }: MainProps) {
  return (
    <header className={styles.container}>
      <div className="flex sp-container align-center logo-wrap">
        <div className="col-8"></div>
        <a className={`${styles.logoBox} col-8`} href="/">
          <img
            className={styles.logo}
            src={logoUrl}
            alt={logoAlt} />
        </a>
        <div className={`${styles.toolBox} col-8 flex align-center`}>
          <a className={`${styles.toolItem}`} href="/cart">
            <i className="iconfont iconic-shop"></i>
          </a>
          <a className={`${styles.toolItem}`} href="/logistics">
            <i className="iconfont iconic-Logistics"></i>
          </a>
        </div>
      </div>
      <Menus menus={menus || []} />
    </header>
  )
}

export default function Header({ notice, logoAlt, logoUrl, menus }: HeaderProps) {
  return (
    <div className={styles.header}>
      <Notice items={notice.contentArr} />
      <HeaderMain
        logoAlt={logoAlt}
        logoUrl={logoUrl}
        menus={menus} />
    </div>
  )
}