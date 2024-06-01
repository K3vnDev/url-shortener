import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UrlsProvider } from './context/UrlsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UrlsProvider>
    <App />
  </UrlsProvider>
)
