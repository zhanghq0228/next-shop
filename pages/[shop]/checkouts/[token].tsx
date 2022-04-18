import React from 'react'
import { useRouter } from 'next/router'
export default function Checkouts() {
  const router = useRouter()
  const { shop, token } = router.query
  return (
    <div>{shop} {token}</div>
  )
}