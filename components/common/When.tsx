import React from 'react'

const isArray = (arg: any): boolean => {
  if (Array.isArray) {
    return Array.isArray(arg)
  }
  return Object.prototype.toString.call(arg) === '[object Array]'
}

interface CaseProps {
  if?: boolean
  elseif?: boolean
  else?: boolean
  children: JSX.Element | JSX.Element[]
}

export const Case = (props: CaseProps) => {
  return <>{props.children}</>
}

export const When = ({ children }: { children: any }): JSX.Element | null => {
  if (!children) {
    return null
  }

  let schildren: any = []
  if (isArray(children)) {
    // 当存在多个case节点时，children为数组
    schildren = children
  } else {
    // 当只有一个case节点，children为object类型
    schildren.push(children)
  }
  // 判断所有的子节点是不是Case类型
  schildren.forEach((child: any) => {
    if (!child.type || child.type.name !== Case.name) {
      throw new Error('the children of component When muse be component Case')
    }
  })
  // 查找if的节点，若有则直接返回
  const ifChildren = schildren.filter((item: any) => item.props.if)
  if (ifChildren.length) {
    return <>{ifChildren}</>
  }
  // 再查找elseif的节点
  const elseIfChildren = schildren.filter((item: any) => item.props.elseif)
  if (elseIfChildren.length) {
    // 这里只输出第1个为true的组件
    return <>{elseIfChildren[0]}</>
  }
  // 返回其他的节点
  return <>{schildren.filter((item: any) => item.props.else)}</>
}
