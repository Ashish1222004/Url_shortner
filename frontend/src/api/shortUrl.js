const API_URL = import.meta.env.VITE_API_URL;

export const createShortUrl = async (url) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url }),
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    return;
  }

  if (!response.ok) {
    throw new Error('Failed to create short URL');
  }

  return await response.text();
};