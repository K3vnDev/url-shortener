import { createContext, useState } from 'react'

export const UrlsContext = createContext()

export function UrlsProvider ({ children }) {
  const [lastUrl, setLastUrl] = useState({})
  const [urls, setUrls] = useState([])

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
