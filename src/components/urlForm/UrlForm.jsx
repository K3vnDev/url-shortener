import { useState } from 'react'
import { useLastUrl } from '../../hooks/useLastUrl'
import isUrl from 'is-url'
import './urlForm.css'
import { useErrorMessage } from '../../hooks/useErrorMessage'
const API_URL = import.meta.env.VITE_API_URL

export function UrlForm () {
  const { displayError, errorMessage, displayingError } = useErrorMessage()
  const [input, setInput] = useState('')
  const { shortenUrl } = useLastUrl()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === '') return

    if (!isUrl(input)) {
      displayError("That's not a valid URL")
      return
    }
    if (input.startsWith(API_URL)) {
      displayError("That's a shortened URL")
      return
    }
    shortenUrl(input)
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
      <span
        className={
          displayingError
            ? 'error-msg'
            : 'error-msg disappear'
        }
      >
        {errorMessage}
      </span>
    </form>
  )
}
