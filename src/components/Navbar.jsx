import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom' 
import { HiOutlineUser } from 'react-icons/hi' 
import { LayoutDashboard } from 'lucide-react' 
import axios from 'axios'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false) 
    const [user, setUser] = useState(null) 
    const location = useLocation() 

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        setIsLoggedIn(!!token)

        if (token) {
            axios.get('https://distreaming-backend1-production.up.railway.app/api/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
            .then(res => {
                setUser(res.data.data) 
            })
            .catch(err => {
                console.error("Gagal ambil data user di navbar:", err)
                if (err.response?.status === 401) {
                    localStorage.removeItem('access_token')
                    setIsLoggedIn(false)
                }
            })
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [location]) 

    return (
        <div className={`fixed w-full z-50 transition-colors duration-300 px-25 py-4 flex items-center justify-between ${
            isScrolled ? 'bg-[#141414] shadow-lg' : 'bg-transparent'
        }`}>
            <div className="flex items-center">
                <p className="flex items-center gap-1">
                    <p className="text-yellow-500 text-xl font-bold italic">diStreaming</p>
                    <p className="text-white text-xl font-medium">Movie</p>
                </p>
            </div>

            <div className="flex items-center gap-6"> 
                {isLoggedIn ? (
                    <>
                        {user?.role === 'admin' && (
                            <Link 
                                to="/admin/dashboard" 
                                className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition-colors text-sm font-bold tracking-wide border-r border-gray-700 pr-6 mr-2"
                            >
                                <LayoutDashboard size={18} />
                                <span>Admin Panel</span>
                            </Link>
                        )}

                        <div className="flex items-center gap-4"> 
                            <Link to="/profile" className="flex items-center gap-2 group">
                                <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center text-black border-2 border-transparent group-hover:border-white transition-all overflow-hidden font-bold">
                                    {user?.username ? user.username.charAt(0).toUpperCase() : <HiOutlineUser size={22} />}
                                </div>
                            </Link>
                            <span className="text-white text-sm font-medium hidden md:block">
                                Hi, <span className="text-yellow-500 font-bold">{user?.username || 'User'}</span>
                            </span>
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="bg-yellow-500 text-black px-5 py-1.5 rounded text-sm font-bold hover:bg-yellow-400 transition shadow-lg">
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar