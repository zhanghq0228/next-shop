import React from 'react'
import styles from '@/styles/module/Input.module.scss'
import {useInputValue} from 'lib'
import {IChange} from 'interface'
type IINput = {
  boxClass?: string
  value?: string | number
  onChange: IChange
}

export default function Input({
  boxClass = '',
  value,
  onChange = () => {}
}: IINput){
  const inputProps = useInputValue(value, onChange);
  return (
    <div className={`${styles.box} ${boxClass} sp-input`}>
      <input type="text" {...inputProps} />
    </div>
  )
}