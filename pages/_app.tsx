import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/styles/index.scss'
import '@/lib/lazy-image'
import type { AppProps, AppContext } from 'next/app'
import Script from 'next/script'
import {
  getModal,
  getHeaderMenuData,
  getFooterMenuData,
  getCollections
} from 'services/common'
// import htmlparser from 'htmlparser'
import TemplateParser from 'lib/html-parser'
import { ICustomerNode, IObject } from 'interface'
import SpHead from 'components/common/SpHead'

function MyApp(options: AppProps) {
  const { Component, pageProps } = options
  const { customHeadCode = [] } = pageProps

  return (
    <>
      <SpHead title="shopNext" list={customHeadCode} />
      <Script src="@/lib/flex" strategy="beforeInteractive" />
      <Component {...pageProps} />
    </>
  )
}
const sessionKeyRe = /^([a-zA-Z]+)[0-9]+$/

MyApp.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const { req } = ctx
  let sessions: IObject<any>[] = []
  let nodes: ICustomerNode[] = []
  let footerMenuDatas = null
  let collectionMap = {}
  try {
    const data = await getModal(req)
    const sessionBox = data.data as IObject<any>
    let menuIds: string[] = []
    let headerMenuId: number = 0
    let collectionIds: string[] = []
    Object.keys(sessionBox).forEach((key: string) => {
      if (sessionKeyRe.test(key)) {
        const sessionData = sessionBox[key]
        let type = RegExp.$1
        if (type === 'banner') {
          type = 'slidesshow'
          sessionData.items = [JSON.parse(JSON.stringify(sessionData))]
        }
        if (type === 'header' && sessionData.menuId) {
          headerMenuId = sessionData.menuId
        }

        if (type === 'footer' && sessionData.menus) {
          menuIds = (sessionData.menus || []).map(i => i.menuId).filter(Boolean)
        }

        if (type === 'collections') {
          collectionIds = collectionIds.concat(
            (sessionData.items || []).map(i => i.collectionId)
          )
        }

        sessionData.sessionDomId = key
        sessions.push({
          type: type,
          data: sessionData
        })
      }
    })
    let [headerResopn, footerRespon, collectionRespon] = await Promise.all([
      getHeaderMenuData(req, headerMenuId),
      getFooterMenuData(req, menuIds.join(',')),
      getCollections(req, [...new Set(collectionIds)].join(','))
    ])
    collectionMap = {}
    collectionRespon.data.forEach(i => {
      collectionMap[i.id] = {
        collectionImageUrl: i.collectionImageUrl || '',
        title: i.title,
        seoUrl: '/collection/' + i.seoUrl
      }
    })
    sessions.forEach(session => {
      if (session.type === 'header') {
        session.data.menus = headerResopn.data
      }
      if (session.type === 'collections') {
        session.data.items = session.data.items.map(i =>
          Object.assign({}, i, collectionMap[i.collectionId])
        )
      }
    })
    // const menusRes = await getFooterData(req, {ids: menuIds.join(',')})
    // console.log(menusRes)
    const parser = new TemplateParser(
      '<script>console.log(1)</script> <script>console.log(2)</script><meta title="dd" ><meta name="description" content="Rorolulu Official Online Store. Shop Personalized Toddlers Rag Dolls, Backpacks &amp; Doll Accessories at Rorolulu.com. Perfect to Buy for any Special Occasions.">'
    )
    nodes = parser.toElementObject()
    // console.log(data)
  } catch (e) {
    console.log(e, 'ddd')
  }
  let componentProps = {}
  if (Component.getInitialProps) {
    componentProps = await Component.getInitialProps(ctx)
  }
  return {
    pageProps: {
      customHeadCode: nodes,
      sessions,
      footerMenuDatas,
      ...componentProps
    }
  }
}
export default MyApp
