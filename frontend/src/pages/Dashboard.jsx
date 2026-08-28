
import { useQuery } from '@tanstack/react-query'

function Dashboard() {


  const fetchUrls = async () => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      'http://localhost:3000/api/create/my-urls',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch URLs')
    }

    return data.urls
  }

  const {
    data: urls = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['myUrls'],
    queryFn: fetchUrls
  })


  if (isLoading) {
    return (
      <div className="container">
        <p>Loading URLs...</p>
      </div>
    )
  }

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
                href={`http://localhost:3000/${url.short_url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`http://localhost:3000/${url.short_url}`}
              </a>
            </p>

            <p>Clicks: {url.clicks}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Dashboard