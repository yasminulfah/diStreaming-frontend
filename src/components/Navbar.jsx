import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineUser } from 'react-icons/hi' 

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    
    const isLoggedIn = localStorage.getItem('access_token') 

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={`fixed w-full z-50 transition-colors duration-300 px-8 py-4 flex items-center justify-between ${
            isScrolled ? 'bg-[#141414] shadow-lg' : 'bg-transparent'
        }`}>
            <div className="flex items-center gap-5">
                <p className="text-yellow-500 text-xl font-medium">diStreaming</p>
                <p className="text-white text-xl font-medium">Movie</p>
            </div>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <Link to="/profile" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center text-black border-2 border-transparent group-hover:border-white transition-all overflow-hidden"><HiOutlineUser size={22} />
                        </div>
                    </Link>
                ) : (
                    
                    <Link to="/login" className="bg-yellow-500 text-black px-5 py-1.5 rounded text-sm font-bold hover:bg-yellow-400 transition shadow-lg">Sign In</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar