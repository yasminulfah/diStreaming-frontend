import { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash2, Edit, Plus, Film, AlertCircle } from 'lucide-react'

const ManageMovies = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMovie, setNewMovie] = useState({
        title: '',
        poster_url: '',
        description: '',
        release_year: '',
        duration: '',
        language: 'English',
        category_id: '',
        director_id: '',
        actors: []
    });

    const getMovies = async () => {
        try {
            setLoading(true)
            setError(null)
            const token = localStorage.getItem('access_token');
            const response = await axios.get('https://distreaming-backend1-production.up.railway.app/api/movies', {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });

            const actualData = response.data.data.data; 
            
            if (Array.isArray(actualData)) {
                setMovies(actualData);
            } else {
                setMovies([]);
            }
        } catch (err) {
            console.error("Gagal mengambil data film", err);
            setError("Gagal mengambil data dari server.");
        } finally {
            setLoading(false) 
        }
    };

    useEffect(() => {
        getMovies()
    }, [])

    const deleteMovie = async (id) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                const token = localStorage.getItem('access_token');
                await axios.delete(`https://distreaming-backend1-production.up.railway.app/api/movies/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                getMovies();
                alert("Movie deleted!");
            } catch (err) {
                console.error("Delete failed", err);
                alert("Gagal menghapus film.");
            }
        }
    };

    const handleAddMovie = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('access_token');
        
        const payload = {
          ...newMovie,
          release_year: parseInt(newMovie.release_year),
          duration: parseInt(newMovie.duration),
          category_id: parseInt(newMovie.category_id),
          director_id: parseInt(newMovie.director_id),
          actors: newMovie.actors.map(id => parseInt(id)) 
        };

        await axios.post('https://distreaming-backend1-production.up.railway.app/api/movies', payload, {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
        });

        setIsModalOpen(false);
        getMovies();
        alert("Movie added successfully!");
      } catch (err) {
        console.error("Dosa Validasi:", err.response?.data?.errors);
        alert("Gagal: " + JSON.stringify(err.response?.data?.errors));
      }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="italic text-gray-400">Loading Movies...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#141414] text-white p-8 pt-24 relative">
            <div className="max-w-6xl mx-auto">
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg flex items-center gap-3 animate-pulse">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <Film className="text-blue-500" size={32} /> Manage Movies
                    </h2>
                    <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg active:scale-95">
                        <Plus size={20} /> Add New Movie
                    </button>
                </div>

                <div className="bg-[#181818] rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#202020] text-gray-400 uppercase text-xs tracking-widest font-black">
                                <tr>
                                    <th className="p-5">Title</th>
                                    <th className="p-5">Year</th>
                                    <th className="p-5">Duration</th>
                                    <th className="p-5">Language</th>
                                    <th className="p-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {movies.map((movie) => (
                                    <tr key={movie.movie_id} className="hover:bg-blue-500/5 transition-colors group">
                                        <td className="p-5 font-semibold text-white group-hover:text-blue-400">
                                            {movie.title}
                                        </td>
                                        <td className="p-5 text-gray-400">{movie.release_year || '-'}</td>
                                        <td className="p-5 text-gray-400">{movie.duration} min</td>
                                        <td className="p-5">
                                            <span className="bg-gray-800 border border-gray-700 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tighter">
                                                {movie.language || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center">
                                            <div className="flex justify-center gap-3">
                                                <button className="p-2 hover:bg-blue-500/20 text-blue-500 rounded-lg transition-all">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => deleteMovie(movie.movie_id)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-[#181818] border border-gray-800 w-full max-w-2xl rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2 sticky top-0 bg-[#181818] py-2 z-10">
                <Film className="text-blue-500" /> Add New Movie
            </h3>
            
            <form onSubmit={handleAddMovie} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Title</label>
                        <input 
                            type="text" required
                            className="w-full bg-[#202020] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                            value={newMovie.title}
                            onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                            placeholder="Movie title"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block tracking-wider">Poster URL</label>
                        <input 
                            type="url" 
                            className="w-full bg-[#202020] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                            value={newMovie.poster_url}
                            onChange={(e) => setNewMovie({...newMovie, poster_url: e.target.value})}
                            placeholder="https://link-to-image.jpg"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Description</label>
                    <textarea 
                        className="w-full bg-[#202020] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition h-20 resize-none"
                        value={newMovie.description}
                        onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                        placeholder="Short synopsis..."
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Year</label>
                        <input 
                            type="number" required
                            className="w-full bg-[#202020] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                            value={newMovie.release_year}
                            onChange={(e) => setNewMovie({...newMovie, release_year: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Duration</label>
                        <input 
                            type="number" required
                            className="w-full bg-[#202020] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                            value={newMovie.duration}
                            onChange={(e) => setNewMovie({...newMovie, duration: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Category</label>
                        <select 
                            required
                            className="w-full bg-[#202020] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition cursor-pointer"
                            value={newMovie.category_id}
                            onChange={(e) => setNewMovie({...newMovie, category_id: e.target.value})}
                        >
                            <option value="">Select</option>
                            <option value="1">Action</option>
                            <option value="7">Adventure</option>
                            <option value="5">Animation</option>
                            <option value="2">Drama</option>
                            <option value="3">Horror</option>
                            <option value="6">Romance</option>
                            <option value="4">Sci-Fi</option>
                            <option value="8">Thriller</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Language</label>
                        <select 
                            className="w-full bg-[#202020] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition cursor-pointer"
                            value={newMovie.language}
                            onChange={(e) => setNewMovie({...newMovie, language: e.target.value})}
                        >
                            <option value="English">English</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Korean">Korean</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Director ID</label>
                        <input 
                            type="number" required
                            className="w-full bg-[#202020] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                            value={newMovie.director_id}
                            onChange={(e) => setNewMovie({...newMovie, director_id: e.target.value})}
                            placeholder="ID"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Actor IDs</label>
                        <input 
                            type="text" required
                            className="w-full bg-[#202020] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                            placeholder="1,2,5"
                            onChange={(e) => {
                                const ids = e.target.value.split(',').map(id => id.trim());
                                setNewMovie({...newMovie, actors: ids});
                            }}
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-800">
                    <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)} 
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-700 text-gray-400 font-bold hover:bg-gray-800 transition active:scale-95"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                        Save Movie
                    </button>
                </div>
            </form>
        </div>
    </div>
)}
        </div>
    )
}

export default ManageMovies