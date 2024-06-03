import { createContext, useState } from 'react'
const favUrlsFromStorage = JSON.parse(window.localStorage.getItem('fav-urls'))

export const UrlsContext = createContext()

export function UrlsProvider ({ children }) {
  const [lastUrl, setLastUrl] = useState({})
  const [urls, setUrls] = useState(favUrlsFromStorage ?? [])

  return (
    <UrlsContext.Provider
      value={{
        urls, setUrls, lastUrl, setLastUrl
      }}
    >
      {children}
    </UrlsContext.Provider>
  )
}
