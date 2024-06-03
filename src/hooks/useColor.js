import { useEffect, useState } from 'react'
import { useUrlsContext } from '../context/useUrlsContext'

export function useColor ({ urlColor, index }) {
  const [color, setColor] = useState(urlColor)
  const { setUrls, lastUrl, setLastUrl } = useUrlsContext()

  const handleColorChange = ({ target }) => {
    setColor(target.value)
  }

  useEffect(() => {
    setUrls(u => {
      const newUrls = structuredClone(u)
      newUrls.splice(index, 1, { ...newUrls[index], urlColor: color })
      return newUrls
    })

    if (lastUrl.urlColor) {
      setLastUrl(u => ({ ...u, urlColor: color }))
    }
  }, [color])

  return { color, handleColorChange }
}
