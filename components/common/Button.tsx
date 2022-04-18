import React, {ReactNode} from 'react'
import styles from '@/styles/module/Button.module.scss'
import {IClick} from 'interface'
type IButton = {
  boxClass?: string
  onClick?: IClick
  children?: ReactNode
  type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link'
}
export default function Button({
  children,
  boxClass = '',
  onClick = () => {},
  type = 'default'
}: IButton){
  const wrapClass = `${styles.box} ${boxClass} btn-${type} btn`
  return (
    <div className={wrapClass} onClick={onClick}>
      <button>{children}</button>
    </div>
  )
}