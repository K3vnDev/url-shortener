import { useUrlsContext } from '../../context/useUrlsContext'
import { shortenUrlStart } from '../../functions/shortenUrlStart'
import { useUrls } from '../../hooks/useUrls'
import { CopyButton } from '../CopyButton'
import './favUrls.css'

export function FavUrls () {
  const { urls } = useUrlsContext()
  const className = urls.length === 0
    ? 'fav-urls-wrapper disappear'
    : 'fav-urls-wrapper appear'

  return (
    <section className={className}>
      {
        urls.map((_, i) => (
          <FavUrl key={i} index={i} />
        ))
      }
    </section>
  )
}

function FavUrl ({ index }) {
  const { urls } = useUrlsContext()
  const { shortedUrl, baseUrl, color } = urls[index]

  const openBaseUrl = () => {
    window.open(baseUrl, '_blank')
  }
  const copyUrl = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(shortedUrl)
  }

  return (
    <div
      onClick={openBaseUrl}
      className='url-wrapper'
    >
      <header>
        <div
          className='colored-box'
          style={{ background: color }}
        />
        <h3>{shortenUrlStart(baseUrl)}</h3>
      </header>
      <section>
        <CopyButton
          onClickCallback={copyUrl}
          toolTip='Copy short URL to clipboard'
        />
        <DeleteButton index={index} />
      </section>
    </div>
  )
}

function DeleteButton ({ index }) {
  const { deleteUrl } = useUrls()

  const handleClick = (e) => {
    e.stopPropagation()
    deleteUrl(index)
  }
  return (
    <button onClick={handleClick}>
      <svg xmlns='http://www.w3.org/2000/svg' height='28px' viewBox='0 -960 960 960' width='28px' fill='#e8eaed'>
        <title>Delete</title>
        <path d='M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z' />
      </svg>
    </button>
  )
}
