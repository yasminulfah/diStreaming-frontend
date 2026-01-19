import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const getMovies = async (page) => {
    try {
      setLoading(true)
      const response = await axios.get(`https://distreaming-backend1-production.up.railway.app/api/movies?page=${page}`)
      
      const result = response.data.data;
      setMovies(result.data || []); 
      setCurrentPage(result.current_page);
      setLastPage(result.last_page);
      
      setLoading(false)
    } catch (err) {
      console.error("Error fetching movies:", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovies(currentPage)
  }, [currentPage])

  return (
    <section className="py-20 px-4 md:px-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white tracking-wide border-l-4 border-yellow-500 pl-4">Trending Now</h2>
        <div className="text-gray-400 text-sm font-medium">Page<span className="text-yellow-500">{currentPage}</span> of {lastPage}
        </div>
      </div>

      {loading ? (
        <div className="h-60 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.movie_id} movie={movie} />
            ))}
          </div>

          <div className="flex justify-center items-center mt-12 gap-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-8 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
                currentPage === 1 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:text-gray-400 active:scale-95'
              }`}
            ><HiChevronLeft size={24} />Previous</button>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
              disabled={currentPage === lastPage}
              className={`px-8 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
                currentPage === lastPage 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:text-gray-400 active:scale-95'
              }`}
            >Next <HiChevronRight size={24} /></button>
          </div>
        </>
      )}
    </section>
  )
}

export default MovieList