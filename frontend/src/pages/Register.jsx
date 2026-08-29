import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setError('')

    if (!username || !email || !password) {
      setError('All fields are required')
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      alert('Registration successful')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create an Account</h2>

        <label>Full Name</label>

        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button
          className="auth-button"
          onClick={handleRegister}
        >
          Create Account
        </button>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register