import React from 'react'
import { When, Case } from './When'
type Props = {
  commentAvgStar?: number
  commentNum?: number
}

export default function Star({ commentAvgStar, commentNum }: Props) {
  return (
    <>
      {commentAvgStar && (
        <div className="product-comment-item-right-rate">
          {[1, 2, 3, 4, 5].map(item => (
            <React.Fragment key={item}>
              <When>
                <Case if={commentAvgStar >= item}>
                  <span className="pz-star aaa">
                    <i
                      className={`iconfont iconic-star ${
                        commentAvgStar >= item ? 'active' : ''
                      }`}
                    ></i>
                  </span>
                </Case>
                <Case elseif={item - commentAvgStar < 1}>
                  <span className="pz-star bbb">
                    <i
                      className={`iconfont iconic-star active-${parseInt(
                        (commentAvgStar + 1 - item) * 100
                      )} active-num`}
                    ></i>
                    <i className="iconfont iconic-star"></i>
                  </span>
                </Case>
                <Case else>
                  <span class="pz-star ccc">
                    <i class="iconfont iconic-star"></i>
                  </span>
                </Case>
              </When>
            </React.Fragment>
          ))}
          <span class="item-attr notranslate">({commentNum || 0})</span>
        </div>
      )}
    </>
  )
}
