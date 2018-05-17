import { sp, SearchQueryBuilder } from '@pnp/sp'

export function fetchNewsItems() {
  const date = new Date()

  const searchQuery = {
    RowLimit: 3,
    SelectProperties: ["Title", "SPWebUrl", 'Path', 'Description', "nzbsExpires", "PromotedNews", "nzbsNewArticlePublishDate", 'PublishingImage', 'PictureURL', 'PictureThumbnailURL'],
    SortList: {
      results: [
        { Property: 'nzbsNewArticlePublishDate', Direction: 1 }
      ]
    }
  }

  const searchText = `path:http://cornerstone/news ContentTypeId:0x0110* PromotedNews<>1 nzbsExpires>${date.toISOString()} nzbsNewArticlePublishDate<=${date.toISOString()} nzbsAppearIn:"Donor Services" `

  const query = SearchQueryBuilder.create(searchText, searchQuery)
  return sp.search(query)
}