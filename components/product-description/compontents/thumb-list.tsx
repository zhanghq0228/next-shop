// @ts-nocheck
import React, { createContext, useContext } from 'react'
import LazyImage from 'components/common/LazyImage'
import styles from '../Detail.module.scss'
import { Ctx } from '../reducer/useReducer'

interface Props {
  imgs: Detail.Imgs[]
}
const ThumbList: React.FC<Props> = ({ imgs = [] }) => {
  const {
    state: { conuste },
    dispatch
  } = useContext(Ctx)
  const sliderChangeHandler = (
    type: string,
    index: number | undefined
  ): void => {
    dispatch({ type, index })
  }

  return (
    <div className={styles.productImage__thumbs}>
      <div
        onClick={() => sliderChangeHandler('prev')}
        className={`${styles.productImage__thumbs_btn} ${styles.productImage__thumbs_buttonPrev}`}
      >
        <i className="iconfont iconarrow-up"></i>
      </div>
      <div className={styles.productImage__thumbs_content}>
        <div className className={styles.productImage__thumbs_content_box}>
          {imgs.map((item, index) => (
            <div
              onClick={() => sliderChangeHandler('select', index)}
              key={item.original}
              className={`${styles.productImage__thumbs_content_item} ${
                index === conuste ? styles.active : ''
              }`}
            >
              <LazyImage src={item.original} />
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={() => sliderChangeHandler('next')}
        className={`${styles.productImage__thumbs_btn} ${styles.productImage__thumbs_buttonNext}`}
      >
        <i className="iconfont iconarrow-down"></i>
      </div>
    </div>
  )
}
export default ThumbList
