import React from 'react'
import SpHead from 'components/common/SpHead'
import type { AppContext } from 'next/app'
import { NextPageContext } from 'next'
import absoluteUrl from 'next-absolute-url'
import request from 'services'

import dynamic from 'next/dynamic'
const DynamicSlickBanner = dynamic(() => import('components/slick-banner'))
const DynamicHeader = dynamic(() => import('components/common/Header'))
const DynamicEmail = dynamic(() => import('components/subscr-email'))
const DynamicIns = dynamic(() => import('components/ins'))
const DynamicVideo = dynamic(() => import('components/video'))
const DynamicCollections = dynamic(() => import('components/collection-list'))
const DynamicImageText = dynamic(() => import('components/image-text'))
const DynamicTwoPic = dynamic(() => import('components/two-pic'))
const DynamicThreePic = dynamic(() => import('components/three-pic'))

const sessionComponentMap = {
  slidesshow: DynamicSlickBanner,
  header: DynamicHeader,
  subEmail: DynamicEmail,
  ins: DynamicIns,
  video: DynamicVideo,
  collections: DynamicCollections,
  imageText: DynamicImageText,
  twoPic: DynamicTwoPic,
  threePic: DynamicThreePic
}
export default function Home({ sessions = [], collectionMap }) {
  // console.log(sessions, arguments)

  return (
    <>
      <SpHead />
      {sessions.map((session, index) => {
        const Component = sessionComponentMap[session.type]
        if (!Component) return null
        return <Component {...session.data} key={session.type + '' + index} />
      })}
      {/* <SpHeader
        menus={menus}
        notices={notices}
        logoAlt="logo"
        logoUrl="//img.staticdj.com/8f0c3e02839a774aaa05a4b4fa1ac71b_600x.png" />
      <SlickBanner 
        items={banner}
        imgHeight='img-big'/> */}
    </>
  )
}
Home.getInitialProps = async ({ ctx }: AppContext) => {
  return { currentPage: 'home' }
}
// export async function getServerSideProps({req}: NextPageContext) {
//   const res = await request({url: '/api/v1/currency'}, req)
//   // const data = await res.json()
//   return {
//     props: {a: 1}, // will be passed to the page component as props
//   }
// }
