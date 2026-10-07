import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL

function Dashboard() {
  const [page, setPage] = useState(1)

  const fetchUrls = async () => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_URL}/api/create/my-urls?page=${page}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      return
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch URLs')
    }

    return data
  }

  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['myUrls', page],
    queryFn: fetchUrls
  })

  if (isLoading) {
    return (
      <div className="container">
        <p>Loading URLs...</p>
      </div>
    )
  }

  const urls = data?.urls || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="container">
      <h1>My URLs</h1>

      {error && (
        <p className="error">
          {error.message}
        </p>
      )}

      {urls.length === 0 ? (
        <p>No URLs created yet.</p>
      ) : (
        urls.map((url) => (
          <div key={url._id} className="short-url">
            <p>
              Original URL:
              <a
                href={url.full_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url.full_url}
              </a>
            </p>

            <p>
              Short URL:
              <a
                href={`${API_URL}/${url.short_url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${API_URL}/${url.short_url}`}
              </a>
            </p>

            <p>Clicks: {url.clicks}</p>
          </div>
        ))
      )}

      {totalPages > 1 && (
        <div>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard