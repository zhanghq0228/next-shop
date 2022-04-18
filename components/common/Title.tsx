import React from 'react'

type Props = {
  title: string
  classS?: string
  styleS?: string
}
export default function Title({ classS, styleS, title }: Props) {
  const defaultName = 'skin-title skin-title-size skin-title-space title-color'
  return (
    <h2 className={`${defaultName} ${classS}`} style={styleS}>
      {title}
    </h2>
  )
}
