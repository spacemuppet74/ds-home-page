import React, { Component } from 'react';

import { fetchNewsItems } from 'services/fetch-news-items'
import { imageSrc } from 'utils/helpers'

import NewsImage from './NewsImage/NewsImage'
import NewsTitle from './NewsTitles/NewsTitles'
import './NewsFeed.scss'

class NewsFeed extends Component {
  state = {
    currentIndex: 0,
    isLoading: true,
    articles: []
  }
  componentDidMount() {
    console.log('news feed component mounted')
    this.fetchNews()
    this.startTimer()
  }

  startTimer = () => {
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

  handleMouseOver = (index) => {
    console.log('mouse over component ', index)
    clearInterval(this.timer)
    this.setState(() => ({ currentIndex: index }))
    this.startTimer()
  }

  render() {
    const { isLoading, articles, currentIndex } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }


    return (
      <div className="news-feed-container">
        <NewsImage article={articles[currentIndex]} />
        <div className="news-feed-articles">
          <NewsTitle article={articles[0]} currentIndex={currentIndex} index={0} hover={this.handleMouseOver} />
          <NewsTitle article={articles[1]} currentIndex={currentIndex} index={1}
            hover={this.handleMouseOver} />
          <NewsTitle article={articles[2]} currentIndex={currentIndex} index={2}
            hover={this.handleMouseOver} />
          <div className="news-feed-article-footer">
            <span className="news-feed-article-links">
              <a href="http://cornerstone/news/Lists/Posts/NZBS-NewPost.aspx?Source=http%3A%2F%2Fcornerstone">Submit article </a>
              |
               <a href="http://cornerstone/Lists/Subscription/NewForm.aspx?Source=http%3A%2F%2Fcornerstone%2FLists%2FSubscription%2FAllItems%2Easpx">Subscribe </a>
              |
               <a href="http://cornerstone/news/Pages/latest.aspx?PageFirstRow=1&FilterField1=appear_in&FilterValue1=Donor%20Services">View all news</a>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsFeed;