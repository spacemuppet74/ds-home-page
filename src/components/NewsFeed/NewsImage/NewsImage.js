import React from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { imageSrc } from 'utils/helpers'

import './NewsImage.scss'

const NewsImage = ({ article }) => {
  return (
    <TransitionGroup className="news-feed-images" appear={true}>
      <CSSTransition
        timeout={{ enter: 7000, exit: 3000 }}
        classNames="feed-image"
        key={article.DocId}
      >
        <div className="news-feed-image" style={{ backgroundImage: `url(${imageSrc(article)}?RenditionID=5)` }}>

        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default NewsImage