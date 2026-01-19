import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom' 
import { HiOutlineUser } from 'react-icons/hi' 

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false) 
    const navigate = useNavigate()
    const location = useLocation() 

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        setIsLoggedIn(!!token)

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [location]) 

    return (
        <div className={`fixed w-full z-50 transition-colors duration-300 px-8 py-4 flex items-center justify-between ${
            isScrolled ? 'bg-[#141414] shadow-lg' : 'bg-transparent'
        }`}>
            <div className="flex items-center gap-5">
                <Link to="/" className="flex items-center gap-1">
                    <p className="text-yellow-500 text-xl font-bold italic">diStreaming</p>
                    <p className="text-white text-xl font-medium">Movie</p>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="flex items-center gap-4"> 
                        <Link to="/profile" className="flex items-center gap-2 group">
                            <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center text-black border-2 border-transparent group-hover:border-white transition-all overflow-hidden">
                                <HiOutlineUser size={22} />
                            </div>
                        </Link>

                        <button 
                            onClick={() => {
                            localStorage.removeItem('access_token')
                            navigate('/login')
                            }}
                            className="text-white text-sm hover:text-yellow-500 transition"
                        >Logout
                        </button>
                    </div>
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