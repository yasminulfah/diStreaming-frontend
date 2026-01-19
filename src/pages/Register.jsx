import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
    password_confirmation: ''
  })
  
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (formData.password !== formData.password_confirmation) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      setLoading(false)
      return
    }

    try {
      const response = await axios.post('https://distreaming-backend1-production.up.railway.app/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      })

      alert('Registrasi Berhasil! Silakan Login.')
      navigate('/login') 
    } catch (err) {
      const serverError = err.response?.data?.message || err.response?.data?.errors;
      setError(typeof serverError === 'object' ? Object.values(serverError)[0][0] : serverError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#141414] px-4">
      <div className="relative z-10 w-full max-w-md p-8 bg-black/75 rounded-md border border-gray-800 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <input 
              name="username"
              type="text" 
              placeholder="Username" 
              className="w-full p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input 
              name="email"
              type="email" 
              placeholder="Email" 
              className="w-full p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input 
              name="password"
              type="password" 
              placeholder="Password" 
              className="w-full p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input 
              name="password_confirmation"
              type="password" 
              placeholder="Confirm Password" 
              className="w-full p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition transform active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Sign Up Now'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-500">
          Already a member? <Link to="/login" className="text-white hover:underline font-semibold">Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Register