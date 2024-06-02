import { useState } from 'react'
let timeoutID

export function useErrorMessage () {
  const [errorMessage, setErrorMessage] = useState('')
  const [displayingError, setDisplayingError] = useState(false)

  const displayError = err => {
    if (displayingError && timeoutID) clearTimeout(timeoutID)

    setErrorMessage(err)
    setDisplayingError(true)
    timeoutID = setTimeout(() => {
      setDisplayingError(false)
    }, 2500)
  }

  return { displayError, errorMessage, displayingError }
}
