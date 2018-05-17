import React, { Component } from 'react';

import { fetchNewsItems } from 'services/fetch-news-items'
import { imageSrc } from 'utils/helpers'

import NewsImage from './NewsImage/NewsImage'
import './NewsFeed.scss'

class NewsFeed extends Component {
  state = {
    currentIndex: 1,
    isLoading: true,
    articles: []
  }
  componentDidMount() {
    console.log('news feed component mounted')
    this.fetchNews()

    this.timer = setInterval(() => {

      if (this.state.currentIndex >= 2) {
        this.setState(() => ({ currentIndex: 0 }))
      } else {
        this.setState(() => ({ currentIndex: this.state.currentIndex + 1 }))
      }
    }, 10000)
  }

  fetchNews = async () => {
    this.setState(() => ({ isLoading: true }))
    const articles = await fetchNewsItems()

    // preFetch the images
    articles.PrimarySearchResults.forEach(article => {
      let img = new Image()
      let src = imageSrc(article)
      img.src = `${src}?RenditionID=5`
    })

    this.setState(() => ({ articles: articles.PrimarySearchResults.slice(), isLoading: false }))


  }

  render() {
    const { isLoading, articles, currentIndex } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }


    return (
      <div className="news-feed-container">
        <div className="news-feed-images">
          <NewsImage article={articles[currentIndex]} />
        </div>
        <div className="news-feed-articles">
          <div className="news-feed-article-title">
            <h2>{articles[0].Title}</h2>
          </div>
          <div className="news-feed-article-title">
            <h2>{articles[1].Title}</h2>
          </div>
          <div className="news-feed-article-title">
            <h2>{articles[2].Title}</h2>
          </div>
          <div className="news-feed-article-footer">
            <span className="news-feed-article-links">Submit article | Subscribe | View all news</span>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsFeed;