import { useUrlsContext } from '../context/useUrlsContext'
import { shortenUrlStart } from '../functions/shortenUrlStart.js'
import { getRandomColor } from '../functions/getRandomColor.js'
const API_URL = import.meta.env.VITE_API_URL

export function useLastUrl () {
  const { setLastUrl } = useUrlsContext()

  const setError = () => {
    setLastUrl({
      error: `Couldn't shorten URL 😿
      try again in a few seconds`
    })
  }

  const shortenUrl = async (url) => {
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
      const shortedUrl = shortenUrlStart(API_URL + urlId)
      setLastUrl({ shortedUrl, baseUrl, urlColor: getRandomColor() })
    } catch {
      setError()
    }
  }
  return { shortenUrl }
}
