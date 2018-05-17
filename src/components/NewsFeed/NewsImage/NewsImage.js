import React from 'react';

import { imageSrc } from 'utils/helpers'

const NewsImage = ({ article }) => {
  return (
    <div className="news-feed-image" style={{ backgroundImage: `url(${imageSrc(article)}?RenditionID=5)` }}>

    </div>
  )
}

export default NewsImage