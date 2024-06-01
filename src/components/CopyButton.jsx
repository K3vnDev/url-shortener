import { useState } from 'react'

export function CopyButton ({ onClickCallback, toolTip }) {
  const [showCheckmark, setShowCheckmark] = useState(false)
  const handleClick = (e) => {
    if (!showCheckmark) {
      onClickCallback(e)
      setShowCheckmark(true)
      setTimeout(() => {
        setShowCheckmark(false)
      }, 1000)
    }
  }
  return (
    <button onClick={handleClick}>
      {
        showCheckmark
          ? (
            <svg xmlns='http://www.w3.org/2000/svg' height='30px' viewBox='0 -960 960 960' width='30px' fill='#e8eaed'><path d='M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z' /></svg>
            )
          : (
            <svg
              xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#e8eaed'
            >
              <title>{toolTip}</title>
              <path d='M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z' />
            </svg>
            )
      }
    </button>
  )
}
