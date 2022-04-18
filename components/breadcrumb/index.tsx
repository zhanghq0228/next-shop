import React from 'react'

interface Props {
  title: string
  seoUrl?: string
}

const Breadcrumb: React.FC<Props> = ({ seoUrl, title }) => {
  return (
    <ul className="s-breadcrumb sp-container">
      <li className="s-breadcrumb__item active">
        <a href="/">home</a>
      </li>
      {seoUrl && (
        <li className="s-breadcrumb__item active">
          <a href="/collections/${collectionSeoUrl}"> {seoUrl} </a>
        </li>
      )}

      <li className="s-breadcrumb__item">{title}</li>
    </ul>
  )
}

export default Breadcrumb
