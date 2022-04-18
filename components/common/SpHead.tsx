import Head from 'next/head'
import React, {isValidElement, ReactNode} from 'react'
import {ICustomerNode} from 'interface'
type Props = {
  title?: string
  children?: ReactNode 
  list?: ICustomerNode[]
}

export default function SpHead({title, children, list = []}: Props) {
  return (
    <Head>
      {title ? <title>{title || 'Create Next App'}</title> : null}
      <link rel="icon" href="/favicon.ico" />
      {
        list.map((item: ICustomerNode, index) => {
          if(!item) return null;
          const html = {__html: item.data || ''}
          if(item.name === 'script') {
            return (
              <script dangerouslySetInnerHTML={html} {...item.attrs} key={index}></script>
            )
          }else if (item.name === 'style') {
            return (
              <style  key={index}>
                {html.__html}
              </style>
            )
          }else if(item.name === 'meta') {
            return (
              <meta {...item.attrs} key={index} />
            )
          }else if(item.name === 'link') {
            return (
              <link {...item.attrs} key={index} />
            )
          }
          return null
        })
      }
      {children}
    </Head>
  )
}
