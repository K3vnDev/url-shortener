import { useState, useEffect, useRef } from 'react'
import { getRandomColor } from '../functions/getRandomColor'
import { useUrlsContext } from '../context/useUrlsContext'
import { useUrls } from './useUrls'

export function useFavorite ({ shortedUrl, baseUrl }) {
  const { urls, setUrls } = useUrlsContext()
  const { deleteUrl } = useUrls()
  const firstRender = useRef(true)

  const alreadyFavorite = !!urls.find(url => url.shortedUrl === shortedUrl)
  const [favorite, setFavorite] = useState(alreadyFavorite)

  const toggleFavorite = () => {
    setFavorite(f => !f)
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      if (favorite) {
        setUrls(u => (
          [...u, {
            shortedUrl,
            baseUrl,
            color: getRandomColor()
          }]
        ))
      } else {
        if (urls.length === 0) return
        const index = urls.findIndex(url => url.shortedUrl === shortedUrl)
        if (index !== -1) {
          deleteUrl(index)
        }
      }
    }
  }, [favorite])

  useEffect(() => {
    const index = urls.findIndex(url => url.shortedUrl === shortedUrl)
    if (index === -1) {
      setFavorite(false)
    }
  }, [urls])

  return { favorite, toggleFavorite }
}
