// @ts-nocheck

import React from 'react'
import { useRouter } from 'next/router'
import { getDetailList } from '@/services/detail'
import ProductDescription from 'components/product-description'
import Breadcrumb from 'components/breadcrumb/index'

interface Props {
  detail: Detail.ProductDescription
}

const Collections: React.FC<Props> = ({ detail = {} }) => {
  const router = useRouter()
  const { urls } = router.query
  const { seoUrl, title } = detail
  return (
    <>
      <Breadcrumb seoUrl={seoUrl} title={title}></Breadcrumb>
      <ProductDescription description={detail}></ProductDescription>
    </>
  )
}

Collections.getInitialProps = async ({ query }) => {
  const { urls } = query
  const seourl = urls.pop()
  const res = await getDetailList(encodeURIComponent(seourl))
  if (res.code === 0) {
    return {
      detail: res.data,
      query
    }
  }
}
export default Collections
