import React from 'react';
import { CSSTransition } from "react-transition-group";
import './NewsTitle.scss'


const NewsTitles = ({ article, currentIndex, index, hover }) => {
  return (
    <CSSTransition
      in={currentIndex === index}
      classNames="news-feed-current-article"
      timeout={{ enter: 7000, exit: 3000 }}
      appear={true}
    >
      <a href={article.Path} className="news-feed-article-title" onMouseEnter={() => hover(index)}>
        <h2>{article.Title}</h2>
      </a>
    </CSSTransition>
  )
}

export default NewsTitles