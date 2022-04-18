import React from 'react'
import SessionTitle from 'components/session-title'
import {IObject, ISessionContainer} from 'interface'

export default function SessionContainer(
  {
    boxClass = '',
    marginBottom,
    marginTop,
    children,
    title,
    titlePosition
  }: ISessionContainer) {
  const boxCls = `session-gap ${boxClass || ''}`
  const style: IObject<string> = {}
  if(marginBottom !== undefined) {
    style.marginBottom = marginBottom
  }
  if(marginTop !== undefined) {
    style.marginTop = marginTop
  }
  return (
    <div className={boxCls} style={style}>
      <SessionTitle title={title} titlePosition={titlePosition}/>
      {children}
    </div>
  )
}