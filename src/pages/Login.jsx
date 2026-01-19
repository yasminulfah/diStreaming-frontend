import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://distreaming-backend1-production.up.railway.app/api/login', {
        email,
        password
      })
      // Simpan token ke localStorage
      localStorage.setItem('token', response.data.token)
      alert('Login Berhasil!')
      navigate('/') // Balik ke Home
    } catch (error) {
      alert('Login Gagal! Cek email & password kamu.')
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div className="relative z-10 w-full max-w-md p-10 bg-black/75 rounded-md border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition"
          >Sign In</button>
        </form>
        
        <div className="mt-6 flex justify-between text-sm text-gray-400">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <span className="hover:underline cursor-pointer">Need help?</span>
        </div>

        <div className="mt-10 text-gray-500">
          New to Distreaming? <span className="text-white hover:underline cursor-pointer font-semibold">Sign up now!</span>
        </div>
      </div>
    </div>
  )
}

export default Login