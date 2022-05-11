// @ts-nocheck
import React, { useState, useReducer, useContext, useEffect } from 'react'
import style from '../Detail.module.scss'
import SkuSelect from '@/lib/skuList.ts'

interface Props {
  options: Detail.Options[]
}
let Selection: any = null

const Variants: React.FC<Props> = ({ options = [], variants = [] }) => {
  const [Available, setAvailable] = useState([])
  const [selected, setselected] = useState([])
  useEffect(() => {
    if (variants.length) {
      if (!Selection) {
        Selection = new SkuSelect()
      }
      let skuList = []
      variants.forEach(item => {
        skuList.push(item.optionValueIds.split(','))
      })
      let groupAttrs = options.map(value =>
        value.values.map(option => option.id)
      )
      Selection.init(groupAttrs, skuList)
      setAvailable(Selection.queryAvailable([]))
    }
  }, [variants])

  useEffect(() => {
    if (Selection) {
      setAvailable(Selection.queryAvailable(selected))
    }
  }, [selected])

  const doSelect = (attr: Detail.Options, id: string) => {
    if (!Available.includes(id)) return
    attr.values.forEach((options, index, item) => {
      if (options.id !== id) {
        options.selected = false
        return
      }
      options.selected = !options.selected

      if (options.selected) {
        setselected(
          selected
            .filter(v => !item.map(id => id.id).includes(v))
            .concat(options.id)
        )
      }
      if (!options.selected) {
        // console.log(options.selected, '减少', options)
        setselected(
          selected.splice(
            selected.findIndex(v => v === options.id),
            1
          )
        )
      }
    })
  }
  return (
    <div className={style.productInfo_variants}>
      {options.map((item, index) => (
        <div
          className={`option-select ${
            item.isImgValue ? 'image-option-choose' : 'normal-option-choose'
          } `}
          key={item.name}
        >
          <div className="option-select__label">
            <span>{item.name}</span>
            <span>:</span>
          </div>
          <ul className="option-select__list">
            {(item.values || []).map(j => (
              <li
                className="option-select__item"
                key={j.id}
                data-id={j.id}
                onClick={() => doSelect(item, j.id)}
              >
                <label
                  className={`
                  ${j.selected && 'active'} 
                  ${
                    Available.length && !Available.includes(j.id) && 'disabled'
                  }`}
                >
                  <div>{j.id}</div>
                  {j.img && <img src={j.img} alt={j.value} data-src={j.img} />}
                  {!j.img && <span>{j.value}</span>}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Variants
