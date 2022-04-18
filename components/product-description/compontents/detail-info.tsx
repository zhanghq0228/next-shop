import React, { useState, useEffect } from 'react'
import style from '../Detail.module.scss'
import Modal from 'components/modal/index'
import {
  getDiscount,
  getVariantInventory,
  getVariantPrice
} from 'services/detail'
import Variants from './variants'
import Input from 'components/common/Input'

interface props extends Detail.ProductDescription {
  options: Detail.Options[]
}
interface GetList {
  (id: string): void
}

const ConcatOptions = (options = [], data = []) => {
  return options.map(item => {
    const res = data.find(i => i.id === item.skuId)
    return {
      ...item,
      ...res
    }
  })
}

const DetailInfo: React.FC<props> = ({
  options,
  title,
  salePrice,
  crossedPrice,
  currency,
  id,
  variants
}) => {
  const [infoList, setinfoList] = useState(null)
  const [CanBuyList, setCanBuyList] = useState([])
  const [PriceList, setPriceList] = useState([])
  const [Options, setOptions] = useState([])
  const [visible, setvisible] = useState(false)
  const [inputNum, setinputNum] = useState(1)

  const Discount: GetList = async id => {
    const res = await getDiscount(id)
    if (res.code === 0) {
      setinfoList(res.data || [])
    }
  }
  const VariantInventory: GetList = async id => {
    const res = await getVariantInventory(id)
    if (res.code === 0) {
      let variant = res.data || []
      variant = variant.filter(i => i.saleStatus && i.saleInventoryQuantity > 0)
      setCanBuyList(variant)
      setOptions(ConcatOptions(variant, variants))
    }
  }
  const VariantPrice: GetList = async id => {
    const res = await getVariantPrice(id)
    if (res.code === 0) {
      setPriceList(res.data || [])
    }
  }
  const handlerClick = () => {
    setvisible(true)
  }

  useEffect(() => {
    Discount(id)
    VariantInventory(id)
    VariantPrice(id)
  }, [id])

  return (
    <div className={style.productInfo}>
      <Modal visible={visible} closeModal={() => setvisible(false)}>
        <div>123ß</div>
      </Modal>
      {/* 商品信息 */}
      <div className={style.productInfo_header}>
        <h1>{title}</h1>
        <div className={style.toolBox}>
          <div className={style.productPric}>
            <>
              <span className={style.money}>
                {currency}
                {salePrice}
              </span>
            </>
            <div className={style.originPrice}>
              <span className={style.money}>
                {currency}
                {crossedPrice}
              </span>
            </div>
          </div>
          <div className={`${style.iconTextBox} ${style.productDiscount}`}>
            <i className="iconfont icondiscount"></i>
            <ul className={style.productDiscount__list}>
              {(infoList || []).map(item => (
                <li key={item.desc}>
                  <span>{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* sku */}
      <Variants options={options} variants={Options}></Variants>

      {/* 尺码表 */}
      <div className={style.sRow}>
        <div className={style.sizeGuide}>
          <button onClick={handlerClick}>
            <i className="iconfont iconic-guide1"></i>
            <span>sizeGuide</span>
          </button>
        </div>
      </div>

      {/* 商品数量 */}
      <div className={style.sRow}>
        <label className={style.sLabel}>qty</label>
        <div className="s-value flex input-number">
          <div
            className={`input-number__action ${
              inputNum === 1 ? 'disabled' : ''
            }`}
            onClick={() => {
              if (inputNum <= 1) return
              setinputNum(inputNum - 1)
            }}
          >
            <span className="iconfont iconcut"></span>
          </div>
          <input
            type="number"
            value={inputNum}
            onChange={event => {
              const { value } = event.target
              setinputNum(Number(value ? value : 1))
            }}
            className="input-number__input action-input-js"
          />
          <div
            className="input-number__action"
            onClick={() => {
              setinputNum(inputNum + 1)
            }}
          >
            <span className="iconfont iconadd"></span>
          </div>
          <span id="buyNumErr" className="input-number__error"></span>
        </div>
      </div>

      {/* 加购按钮 */}
      <div className="product-actions">
        <div className="flex btns skin-button">
          <button
            className="s-btn s-btn--medium s-btn--primary can-buy-js can-buy skin-button"
            id="addBag"
          >
            <span>addToBag</span>
          </button>
          <button
            className="s-btn s-btn--medium can-buy-js can-buy skin-button"
            id="buy"
          >
            <span>buy</span>
          </button>

          {/* style="display: none; margin-left: 0;" */}
          <button className="s-btn s-btn--medium sold-out-js disabled soldout-btn skin-button">
            <span>soldOut</span>
          </button>
        </div>
        {/* style="margin-left: 0;" */}
        <div
          className="s-btn s-btn--medium paypal-btn can-buy-js hide"
          id="paypal-button-container"
        ></div>
      </div>
    </div>
  )
}

export default DetailInfo
