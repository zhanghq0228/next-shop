// @ts-nocheck
import { NextPage } from 'next'
import { getCollectionsList } from '@/services/collections'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const DynamicProductListCom = dynamic(
  () => import('components/product-list-com')
)

const Pagination = dynamic(() => import('components/common/Pagination'))
interface Props {
  userAgent?: string
}

const getCollectionlistFn = async (
  url: string,
  params: any
): Promise | void => {
  try {
    const res = await getCollectionsList(encodeURIComponent(url), params)
    if (res.data) {
      return {
        pageList: res.data
      }
    }
    return { pageList: [] }
  } catch (e) {
    console.log(e)
  }
}

const Collections: NextPage<Props> = ({ pageList, query }) => {
  const { collection } = pageList
  const { page_num = 1 } = query

  const [currentPage, setCurrentPage] = useState(Number(page_num))

  const { productList = [], totalCount = 0 } =
    collection?.productAndOptionsImgDto
  const mapList = productList.map(i => ({
    ...i,
    jumpUrl: `/collections/${query.url}/products/${i.seoUrl}`
  }))
  const [list, setList] = useState(mapList)
  const pageSize: number = 40
  const changeHandler = async (): void => {
    const res = await getCollectionlistFn(query.url, {
      ...query,
      page_num: currentPage
    })
    if (res.pageList) {
      const mapList =
        res.pageList.collection?.productAndOptionsImgDto?.productList.map(
          i => ({
            ...i,
            jumpUrl: `/collections/${query.url}/products/${i.seoUrl}`
          })
        )
      setList(mapList)
    }
  }

  useEffect(() => {
    changeHandler()
  }, [currentPage])

  return (
    <div className="page-width">
      <DynamicProductListCom data={list}></DynamicProductListCom>
      <Pagination
        total={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={(pageNum: number) => setCurrentPage(pageNum)}
      ></Pagination>
    </div>
  )
}

Collections.getInitialProps = async ({ query }) => {
  const { url } = query
  const res = await getCollectionlistFn(url, query)
  return { ...res, query }
}

export default Collections
