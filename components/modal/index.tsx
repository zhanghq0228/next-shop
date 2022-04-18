import React, { useEffect, useRef } from 'react'
import style from './modal.module.scss'
import { createPortal } from 'react-dom'

interface Props {
  visible: boolean
  children: import('react').ReactChild
  closeModal: () => void
}
const Modal: React.FC<Props> = ({ children, visible, closeModal }) => {
  function handleClick() {
    closeModal()
  }
  const modal = (
    <div className={style.modal}>
      <div className={style.modalDialog}>
        <div className={style.modalContent}>
          <div className={style.modalHeader}>
            <button type="button" className={style.close} onClick={handleClick}>
              <i className="iconfont iconic-close1"></i>
            </button>
          </div>
          <div className={style.modalBody}>{children}</div>
        </div>
      </div>
    </div>
  )
  return <div>{visible && modal}</div>
}

export default React.memo(Modal)
