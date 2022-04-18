import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  useImperativeHandle
} from 'react'
import { useRouter } from 'next/router'
import SessionContainer from 'components/session-container'
import styles from '@/styles/module/SubscrEmail.module.scss'
import { IObject, ISessionSame } from 'interface'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import { useInputValue, useCurrentData } from 'lib'
import useSWR from 'swr'
import { postSubScriptEamil } from 'services/common'
type ISubscrEmail = ISessionSame & {
  list: number | string
  rowsNum?: number
  oneRowsNum?: number
  imgRateHeight?: string
  name?: string
  btnText: string
  subName?: string
  thankSubTitle?: string
  thankTitle?: string
}

type IEmailForm = {
  btnText: string
  subscribeSuccess: Function
  sourceType: number
  [propName: string]: any
}

function EmailForm(
  { btnText, subscribeSuccess, sourceType }: IEmailForm,
  ref: any
) {
  const emailInput = useInputValue('')
  const textRef = useCurrentData(emailInput.value)
  const router = useRouter()
  const handleSubscripe = useCallback(
    async function () {
      try {
        let utmTerm = router.query.utm_term || ''
        const email = textRef.current
        await postSubScriptEamil({
          email: email,
          source_type: sourceType,
          utm_term: utmTerm
        })
        subscribeSuccess(true)
      } catch (e) {
        console.log(e)
      }
    },
    [textRef]
  )
  // useImperativeHandle(ref, () => { // 暴露内部方法与属性
  //   return {
  //     emailInput,
  //     handleSubscripe
  //   }
  // })
  return (
    <>
      <Input boxClass="col-16 col-sm-24" {...emailInput} />
      <Button boxClass="col-8 col-sm-24" onClick={handleSubscripe}>
        {btnText}
      </Button>
    </>
  )
}

export const EmailFormRef = React.forwardRef(EmailForm)

export default function SubscrEmail({
  title = '',
  titlePosition = 'center',
  marginBottom,
  marginTop,
  name,
  btnText,
  subName,
  thankSubTitle,
  thankTitle
}: ISubscrEmail) {
  let [isSuccess, setIsSuccess] = useState(false)
  const inputRef = useRef()
  // const testClick = useCallback(function(...args) {
  //   console.log(args, 'args')
  //   console.log(isSuccess, 'isSuccess')
  // }, [isSuccess])
  return (
    <SessionContainer
      boxClass={`${styles.subscr} sp-container`}
      title={isSuccess ? thankTitle : title || name}
      titlePosition={titlePosition}
      marginBottom={marginBottom}
      marginTop={marginTop}
    >
      <div
        className={styles.subName}
        // onClick={testClick.bind(null, 41, 42, 43)}
        // onClick={() => {console.log(inputRef)}}
      >
        {isSuccess ? thankSubTitle : subName}
      </div>
      {/* <div onClick={testClick.bind(null, 1, 2, 3)}>position</div> */}
      {!isSuccess ? (
        <div className={`${styles.subscrForm} form-row`}>
          <EmailFormRef
            ref={inputRef}
            btnText={btnText}
            subscribeSuccess={setIsSuccess}
            sourceType={3}
          />
        </div>
      ) : null}
    </SessionContainer>
  )
}
