export const shortenUrlStart = url => {
  const delValue = value => {
    if (url.startsWith(value)) {
      url = url.replace(value, '')
    }
  }
  delValue('http://')
  delValue('https://')
  delValue('www.')
  return url
}
