import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUserDetail = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`https://distreaming-backend1-production.up.railway.app/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log(Response.data)
                setUserData(response.data.data)
                setLoading(false)
            } catch (err) {
                console.error("Failed to get user detail", err)
                setLoading(false)
            }
        }

        getUserDetail()
    }, [id])

    if (loading) return <div className="text-white text-center mt-20">Loading User Detail...</div>
    if (!userData) return <div className="text-white text-center mt-20">User not found.</div>

    return (
        <div className="min-h-screen bg-[#141414] px-8 py-24 text-white">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-8 flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition"
            >
                ← Back to User List
            </button>

            <div className="flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/3 bg-[#181818] p-8 rounded-2xl border border-gray-800 text-center">
                    <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center text-5xl font-bold text-black mx-auto mb-6">
                        {userData.username?.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{userData.username}</h1>
                    <p className="text-gray-400 mb-4">{userData.email}</p>
                </div>

                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">User Watchlist</h2>
                    
                    {userData.watchlist_movies && userData.watchlist_movies.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {userData.watchlist_movies.map((movie) => (
                                <div key={movie.movie_id} className="bg-[#181818] p-3 rounded-lg border border-gray-800">
                                    <p className="font-medium text-sm text-yellow-500">{movie.title}</p>
                                    <p className="text-xs text-gray-500">{movie.release_year || 'No Year'}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">This user hasn't added any movies to their watchlist yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserDetail