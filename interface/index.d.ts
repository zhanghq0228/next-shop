import { ReactNode, MouseEvent, ChangeEvent } from 'react'
export type ITitle = {
  titlePosition?: string
  title?: string
}

export type IObject<t> = {
  [propsName: string]: t
}
export type IMargin = {
  marginTop?: string
  marginBottom?: string
}

export type ISessionSame = IMargin & ITitle & {
  sessionDomId?: string
}
export type ISessionContainer = {
  boxClass?: string
  children?: ReactNode
} & ISessionSame

export type ICustomerNode = {
  type: string
  name: string
  data?: string
  attrs: IObject<string>
}

export interface IClick {
  (e?: MouseEvent): void;
}

export interface IChange {
  (e?: ChangeEvent | string): void;
}