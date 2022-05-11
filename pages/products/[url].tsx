// @ts-nocheck

import React from 'react'
import { useRouter } from 'next/router'
import { getDetailList } from '@/services/collections'
interface props {
  id: string
}
export default function Product({ detail }) {
  const router = useRouter()
  const { url } = router.query
  return <div>hh {url}</div>
}

Product.getInitialProps = async ({ req }) => {
  const res = await getDetailList('196421-3-capteurs-de-soleil-7-chakras')

  if (res.code === 0) {
    return {
      detail: res.data
    }
  }
}
