import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react'; // Pakai Lucide agar konsisten
import axios from 'axios';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserDetail = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`https://distreaming-backend1-production.up.railway.app/api/users/${id}`, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                });
                
                const result = response.data.data || response.data;
                setUserData(result);
                setLoading(false);
            } catch (err) {
                console.error("Failed to get user detail:", err);
                setLoading(false);
            }
        };

        if (id) getUserDetail();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white italic">
            Loading User Detail...
        </div>
    );

    if (!userData) return (
        <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white">
            User not found.
        </div>
    );

    return (
        <div className="min-h-screen bg-[#141414] px-8 py-24 text-white">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-8 flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition font-medium"
            >
                <ArrowLeft size={20} /> Back to User List
            </button>

            <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto">
                <div className="w-full md:w-1/3 bg-[#181818] p-8 rounded-2xl border border-gray-800 text-center h-fit sticky top-24">
                    <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center text-5xl font-bold text-black mx-auto mb-6 shadow-lg shadow-yellow-500/10">
                        {userData.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{userData.username}</h1>
                    <p className="text-gray-400 mb-6">{userData.email}</p>
                    
                    <div className="inline-block px-4 py-1 bg-yellow-500/10 border border-yellow-500/50 rounded-full text-yellow-500 text-xs font-bold uppercase tracking-wider">
                        {userData.role || 'Member'}
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
                        <Film className="text-yellow-500" size={24} />
                        <h2 className="text-2xl font-bold">User Watchlist</h2>
                    </div>
                    
                    {userData.watchlist_movies && userData.watchlist_movies.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {userData.watchlist_movies.map((movie) => (
                                <div 
                                    key={movie.movie_id || movie.id} 
                                    className="bg-[#181818] p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition group"
                                >
                                    <p className="font-bold text-lg text-white group-hover:text-yellow-500 transition">
                                        {movie.title}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Release Year: {movie.release_year || 'N/A'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-[#181818]/50 border border-dashed border-gray-800 p-12 rounded-2xl text-center">
                            <p className="text-gray-500 italic font-medium">
                                This user hasn't added any movies to their watchlist yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetail;