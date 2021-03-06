import React from 'react'
import style from './index.module.scss'
import LazyImage from 'components/common/LazyImage'
import Title from 'components/common/Title'
import Money from 'components/common/Money'
import Star from 'components/common/Star'

const ProductListCom: React.FC<ProductList.List> = ({ data }) => {
  console.log(data)
  return (
    <div className={style.productListBox}>
      <ul className={`${style.productList} ${style['row-item-4']}`}>
        {(data || []).map(item => (
          <li key={item.id} className={`${style.productListItem}`}>
            <a href={item.jumpUrl}>
              <div>
                <LazyImage src={item.thumbnail} rate=""></LazyImage>
              </div>
              <Title
                title={item.seoTitle}
                classS={style.productItemTitle}
              ></Title>
              <Money
                saleprice={item.salePrice}
                originalprice={item.compareAtPrice}
              ></Money>
              <Star
                commentAvgStar={item.commentAvgStar}
                commentNum={item.commentNum}
              ></Star>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductListCom
