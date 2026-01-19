import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaStar } from "react-icons/fa"

const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://distreaming-backend1-production.up.railway.app/api/movies/${id}`)
        
        const data = response.data.data || response.data;
        setMovie(data)
      } catch (err) {
        setError("Gagal memuat detail film.")
      } finally {
        setLoading(false)
      }
    }

    if (id) getMovieDetail()
  }, [id])

  const handleAddToWatchlist = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      alert("Silahkan login terlebih dahulu!")
      return
    }

    setAdding(true)
    try {
      await axios.post('https://distreaming-backend1-production.up.railway.app/api/watchlist', 
        { movie_id: id },
        { headers: { Authorization: `Bearer ${token}` } })
      alert("Berhasil ditambahkan ke Watchlist!")
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menambah ke watchlist.")
    } finally {
      setAdding(false)
    }
  }

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#141414] text-white font-bold">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-600 mr-4"></div>
      Loading Movie Detail...
    </div>
  )

  if (error || !movie) return (
    <div className="h-screen flex items-center justify-center bg-[#141414] text-red-500">
      {error || "Film tidak ditemukan."}
    </div>
  )

  return (
    <div className="bg-[#141414] min-h-screen text-white pt-24 pb-10 px-8 md:px-20">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-80 flex-shrink-0">
          <img 
            src={movie.poster_url} 
            alt={movie.title} 
            className="w-full rounded-xl shadow-2xl border border-gray-800"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-3xl lg:text-xl font-semibold uppercase tracking-tighter">
            {typeof movie.title === 'string' ? movie.title : 'No Title'}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-400 text-lg">
            <span className="text-yellow-400"><FaStar color="gold" /> {movie.average_rating || 'N/A'}</span>
            <span>{movie.release_year || 'Year Unknown'}</span>
            <span className="border px-2 py-0.5 rounded text-xs border-gray-500">HD</span>
          </div>

          <p className="text-gray-300 leading-relaxed max-w-3xl">
            {typeof movie.description === 'string' ? movie.description : 'No description available.'}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg">
              ▶ Play Movie
            </button>
            
            <button 
              onClick={handleAddToWatchlist}
              disabled={adding}
              className={`px-10 py-3 rounded-full font-bold backdrop-blur-md transition-all border border-white/20 flex items-center gap-2 ${
                adding ? 'bg-gray-700 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {adding ? "Adding..." : "+ Watchlist"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-gray-800">
            <div>
              <h4 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-2">Director</h4>
              <div className="text-white font-medium">
                {typeof movie.director === 'string' ? movie.director : 'Information not available'}
              </div>
            </div>
            <div>
              <h4 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-2">Cast</h4>
              <div className="text-white text-sm leading-relaxed">
                {Array.isArray(movie.actors) 
                  ? movie.actors.join(', ') 
                  : (typeof movie.actors === 'string' ? movie.actors : 'Cast not available')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail