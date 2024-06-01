import { UrlForm } from './components/urlForm/UrlForm.jsx'
import { UrlContent } from './components/urlContent/UrlContent.jsx'
import { FavUrls } from './components/favUrls/FavUrls.jsx'

function App () {
  return (
    <>
      <section className='main-wrapper'>
        <h1>URL Shortener</h1>
        <UrlForm />
        <UrlContent />
      </section>
      <FavUrls />
    </>
  )
}

export default App
