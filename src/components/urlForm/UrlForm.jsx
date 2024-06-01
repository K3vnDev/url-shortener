import { useState } from 'react'
import { useLastUrl } from '../../hooks/useLastUrl'
import isUrl from 'is-url'
import { useUrlsContext } from '../../context/useUrlsContext'
import './urlForm.css'
const API_URL = import.meta.env.VITE_API_URL

export function UrlForm () {
  const [input, setInput] = useState('')
  const { shortenId } = useLastUrl()
  const { setLastUrl } = useUrlsContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === '') return
    if (!isUrl(input)) {
      setLastUrl({ error: "That's not a valid URL" })
      return
    }
    if (input.startsWith(API_URL)) {
      setLastUrl({ error: "That's a shortened URL" })
      return
    }
    shortenId(input)
    setInput('')
  }

  const handleInputChange = (e) => {
    const { value } = e.target
    if (value !== ' ') setInput(value.trim())
  }

  return (
    <form className='paste-url-form' onSubmit={handleSubmit}>
      <input
        onChange={handleInputChange}
        placeholder='Paste URL here...'
        value={input.trim()}
      />
      <button>Shorten</button>
    </form>
  )
}
