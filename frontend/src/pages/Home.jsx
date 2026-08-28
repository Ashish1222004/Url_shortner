import { useState } from 'react'
import "../App.css";
import { createShortUrl } from "../api/shortUrl";

function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCreateShortUrl = async () => {
    setLoading(true)
    setError('')
    setShortUrl('')
    setCopied(false)

    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      setError('Please enter a URL')
      setLoading(false)
      return
    }

    try {
      new URL(trimmedUrl)
    } catch {
      setError('Please enter a valid URL')
      setLoading(false)
      return
    }

    try {
      const data = await createShortUrl(trimmedUrl)
      setShortUrl(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setUrl('')
    setShortUrl('')
    setError('')
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setError('Failed to copy URL')
    }
  }

  return (
    <div className="container">
      <h1>Shorten Your URL</h1>

      <p className="subtitle">
        Enter your long URL and get a short link instantly.
      </p>

      <input
        type="text"
        placeholder="Enter your long URL"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value)
          setError('')
        }}
      />

      {error && <p className="error">{error}</p>}

      <button
        onClick={handleCreateShortUrl}
        disabled={loading}
      >
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>

      <button
        onClick={handleClear}
        disabled={loading}
      >
        Clear
      </button>

      {shortUrl && (
        <div className="short-url">
          <p>Short URL:</p>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>

          <button onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Home