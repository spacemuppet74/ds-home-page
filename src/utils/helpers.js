export function imageSrc(article) {
  const regex = /<img.*?src="([^">]*\/([^">]*?))".*?>/;
  const imgSrc = regex.exec(article.PublishingImage)[1]

  return imgSrc
}