import { useUrlsContext } from '../context/useUrlsContext'
const API_URL = import.meta.env.VITE_API_URL

export function useLastUrl () {
  const { setLastUrl } = useUrlsContext()

  const setError = () => {
    setLastUrl({
      error: `Couldn't shorten URL 😿
      try again in a few seconds`
    })
  }

  const shortenId = async (url) => {
    setLastUrl({ loading: true })
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })

      const { urlId, baseUrl, error } = await res.json()
      if (error) {
        setError()
        return
      }
      const shortedUrl = API_URL + urlId
      setLastUrl({ shortedUrl, baseUrl })
    } catch {
      setError()
    }
  }
  return { shortenId }
}
