import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://distreaming-backend1-production.up.railway.app/api/register', {
        name,
        email,
        password
      })
      alert('Registrasi Berhasil! Silakan Login.')
      navigate('/login') 
    } catch (error) {
      alert(error.response?.data?.message || 'Registrasi Gagal! Cek kembali data kamu.')
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#141414]">
      <div className="relative z-10 w-full max-w-md p-10 bg-black/75 rounded-md border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-8">Sign Up</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input 
            type="email" 
            placeholder="Email Address" 
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
          >Sign Up</button>
        </form>

        <div className="mt-10 text-gray-500">
          Already have an account? <Link to="/login" className="text-white hover:underline font-semibold">Sign in now!</Link>
        </div>
      </div>
    </div>
  )
}

export default Register