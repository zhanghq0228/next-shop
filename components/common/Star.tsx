import React from 'react'
import { When, Case } from './When'
type Props = {
  commentAvgStar?: any
  commentNum?: number
}

export default function Star({ commentAvgStar, commentNum }: Props) {
  const star: number = Number(commentAvgStar)

  return (
    <>
      {commentAvgStar && (
        <div className="product-comment-item-right-rate">
          {[1, 2, 3, 4, 5].map(item => (
            <React.Fragment key={item}>
              <When>
                <Case if={star >= item}>
                  <span className="pz-star aaa">
                    <i
                      className={`iconfont iconic-star ${
                        star >= item ? 'active' : ''
                      }`}
                    ></i>
                  </span>
                </Case>
                <Case elseif={item - star < 1}>
                  <span className="pz-star bbb">
                    {/* <i
                      className={`iconfont iconic-star active-${parseInt(
                        (star + 1 - item) * 100
                      )} active-num`}
                    ></i> */}
                    <i className="iconfont iconic-star"></i>
                  </span>
                </Case>
                <Case else>
                  <span className="pz-star ccc">
                    <i className="iconfont iconic-star"></i>
                  </span>
                </Case>
              </When>
            </React.Fragment>
          ))}
          <span className="item-attr notranslate">({commentNum || 0})</span>
        </div>
      )}
    </>
  )
}
