import { useState } from 'react'
import { useUrlsContext } from '../../context/useUrlsContext'
import { useFavorite } from '../../hooks/useFavorite'
import { CopyButton } from '../CopyButton'
import './urlContent.css'
import { shortenUrlStart } from '../../functions/shortenUrlStart'

export function UrlContent () {
  const { lastUrl: { error, loading, shortedUrl, baseUrl } } = useUrlsContext()

  if (error || loading) {
    return (
      <div className='last-url-wrapper'>
        {loading && <Loading />}
        {error && <Error message={error} />}
      </div>
    )
  }
  if (shortedUrl && baseUrl) {
    return (
      <div className='last-url-wrapper'>
        <UrlInfo shortedUrl={shortedUrl} baseUrl={baseUrl} />
      </div>
    )
  }
  return <div className='last-url-wrapper' />
}

function Loading () {
  const loadingPoints = Array(3).fill(0.14)
  return (
    <div className='url-loading'>
      {
        loadingPoints.map((p, i) => (
          <div
            className='point'
            key={i}
            style={{
              animation: `loading-point 1s ease-in-out ${i * p}s infinite`
            }}
          />
        ))
      }
    </div>
  )
}

function Error ({ message }) {
  const [className, setClassName] = useState('error-card')
  const handleClick = () => {
    setClassName('error-card disappear')
  }
  return (
    <div className={className}>
      <p>{message}</p>
      <button onClick={handleClick}>
        <svg xmlns='http://www.w3.org/2000/svg' height='20px' viewBox='0 -960 960 960' width='20px' fill='#e8eaed'>
          <path d='m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z' />
        </svg>
      </button>
    </div>
  )
}

function UrlInfo ({ shortedUrl, baseUrl }) {
  const [showCopiedMsg, setShowCopiedMsg] = useState(false)
  const { favorite, toggleFavorite } = useFavorite({ shortedUrl, baseUrl })

  const handleClick = () => {
    navigator.clipboard.writeText(shortedUrl)
    if (!showCopiedMsg) {
      setShowCopiedMsg(true)
      setTimeout(() => setShowCopiedMsg(false), 3000)
    }
  }

  return (
    <div className='last-url-card'>
      <header>
        <h3>Your shortened URL:</h3>
        <button onClick={toggleFavorite}>
          <FavoriteIcon favorite={favorite} />
        </button>
      </header>
      <main>
        <p>{shortenUrlStart(shortedUrl)}</p>
        <CopyButton
          onClickCallback={handleClick}
          toolTip='Copy to clipboard'
        />
      </main>
      {
        showCopiedMsg &&
          <small className='copied-info-msg'>
            Copied to clipboard!
          </small>
      }
    </div>
  )
}

function FavoriteIcon ({ favorite }) {
  if (favorite) {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' height='20px' viewBox='0 -960 960 960' width='20px' fill='#e8eaed'><path d='m480-144-50-45q-100-89-165-152.5t-102.5-113Q125-504 110.5-545T96-629q0-89 61-150t150-61q49 0 95 21t78 59q32-38 78-59t95-21q89 0 150 61t61 150q0 43-14 83t-51.5 89q-37.5 49-103 113.5T528-187l-48 43Z' /></svg>
    )
  }
  return (
    <svg className='empty-fav' xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#e8eaed'><path d='m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z' /></svg>
  )
}
