import React from 'react'
import DetailSlider from './compontents/detail-slider'
import DetailInfo from './compontents/detail-info'
import style from './Detail.module.scss'

const ProductDescription: React.FC<Detail.ProductDescription> = ({
  description
}) => {
  // console.log(description)

  return (
    <>
      <div className={`${style.detail} sp-container`}>
        <DetailSlider imgs={description.imgs}></DetailSlider>
        <DetailInfo {...description}></DetailInfo>
        {/* <div className={`${style.productInfo}`}>表单</div> */}
        <div className={`${style.productInfoDesc} col-24 `}>描述</div>
      </div>
    </>
  )
}

export default ProductDescription
