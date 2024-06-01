import { UrlsContext } from './UrlsContext'
import { useContext } from 'react'

export function useUrlsContext () {
  const { urls, setUrls, lastUrl, setLastUrl } = useContext(UrlsContext)
  return { urls, setUrls, lastUrl, setLastUrl }
}
