import { useEffect } from 'react'
import { useUrlsContext } from '../context/useUrlsContext'

export function useUrls () {
  const { urls, setUrls } = useUrlsContext()

  const deleteUrl = index => {
    setUrls(u => {
      const newUrls = structuredClone(u)
      newUrls.splice(index, 1)
      return newUrls
    })
  }

  useEffect(() => {
    window.localStorage.setItem('fav-urls', JSON.stringify(urls))
  }, [urls])

  return { deleteUrl }
}
