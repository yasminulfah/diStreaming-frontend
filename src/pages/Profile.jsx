import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { HiLogout, HiOutlineMail, HiOutlineUser } from 'react-icons/hi'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token')
      
      if (!token) {
        navigate('/login')
        return;
      }

      try {
        const response = await axios.get('https://distreaming-backend1-production.up.railway.app/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        });
        
        setUser(response.data); 
      } catch (err) {
        console.error("Gagal mengambil data user:", err)
        localStorage.removeItem('access_token')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/')
    window.location.reload()
  }

  if (loading) return <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white">Loading...</div>

  return (
    <div className="bg-[#141414] min-h-screen text-white pt-24 px-8">
      <div className="max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-2xl border border-white/10">
        <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-black text-3xl font-black mb-4">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h2 className="text-xl font-bold">{user?.username || 'Username'}</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
            <HiOutlineUser className="text-yellow-500" size={24} />
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Full Name</p>
              <p className="font-medium">{user?.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
            <HiOutlineMail className="text-yellow-500" size={24} />
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Email Address</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link tp="/" 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-500/10 px-8 py-3 rounded-full border border-red-500/20 transition duration-300 active:scale-95"
          >
            <HiLogout size={20} /> Logout from all devices
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile