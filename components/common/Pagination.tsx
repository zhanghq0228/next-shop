import React from 'react'
import styles from '@/styles/module/Pagination.module.scss'
import RcPagination, {
  // PaginationLocale,
  PaginationProps as RcPaginationProps
} from 'rc-pagination'
import 'rc-pagination/assets/index.css'

// export { PaginationLocale }
export interface Page extends RcPaginationProps {}

export default function Pagination(props: Page): JSX.Element {
  return (
    <div className={styles.pagination}>
      <RcPagination {...props} />
    </div>
  )
}
