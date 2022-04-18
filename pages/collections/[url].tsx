import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getCollectionsList } from '@/services/collections'
import dynamic from 'next/dynamic'
const DynamicProductListCom = dynamic(
  () => import('components/product-list-com')
)
interface Props {
  userAgent?: string
}

const Collections: NextPage<Props> = ({ pageList }) => {
  const { collection } = pageList

  const mapList =
    (collection &&
      collection.productAndOptionsImgDto &&
      collection.productAndOptionsImgDto.productList.map(i => ({
        ...i,
        seoUrl: `/collecti?url=${i.seoUrl}`
      }))) ||
    []
  // console.log(mapList)
  // const router = useRouter()
  // const { url } = router.query
  return (
    <div className="page-width">
      <DynamicProductListCom data={mapList}></DynamicProductListCom>
    </div>
  )
}

Collections.getInitialProps = async ({ query }) => {
  const { url } = query
  const res = await getCollectionsList(encodeURIComponent(url))
  if (res.data) {
    return {
      pageList: res.data
    }
  }
  return { pageList: [] }
}

export default Collections
