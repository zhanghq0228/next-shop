import React, { useState, useEffect, useReducer } from 'react'
import Slider from 'react-slick'
import LazyImage from 'components/common/LazyImage'
import style from '../Detail.module.scss'
import ThumbList from './thumb-list'
import { defaultState, reducer } from '../reducer/reducer'
import { Ctx } from '../reducer/useReducer'

const settings = {
  dots: false,

  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  // autoplay: true,
  draggable: true
}
interface Props {
  imgs: Detail.Imgs[]
}

const DetailSlider: React.FC<Props> = ({ imgs }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [slider, setslider] = useState(null)

  useEffect(() => {
    dispatch({ type: 'imgsNum', imgsNum: (imgs||[]).length })
  }, [imgs])

  useEffect(() => {
    slider ? slider.slickGoTo(state.conuste) : ''
  }, [state.conuste])

  const children = (imgs || []).map(item => {
    return (
      <div key={item.original} className={style.item}>
        <img className={style.imageItem} src={item.original} alt="" />
        {/* <LazyImage
          key={item.original}
          src={item.original}
          boxClass="hidden-md-down"
        /> */}
      </div>
    )
  })
  return (
    <div className={style.productImage}>
      <Slider
        {...settings}
        ref={c => setslider(c)}
        beforeChange={(index: number, nextSlide: number): void => {
          dispatch({ type: 'select', index: nextSlide })
        }}
      >
        {/* {imgs.map((item, index) => (
          <div key={item.original + index}>
            <LazyImage src={item.original} boxClass="hidden-md-down" />
          </div>
        ))} */}
        {children}
      </Slider>

      <Ctx.Provider value={{ state, dispatch }}>
        <ThumbList imgs={imgs} styles={style}></ThumbList>
      </Ctx.Provider>
    </div>
  )
}

export default DetailSlider
