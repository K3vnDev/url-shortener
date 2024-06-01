import { useUrlsContext } from '../context/useUrlsContext'

export function useUrls () {
  const { setUrls } = useUrlsContext()

  const deleteUrl = index => {
    setUrls(u => {
      const newUrls = structuredClone(u)
      newUrls.splice(index, 1)
      return newUrls
    })
  }

  return { deleteUrl }
}
