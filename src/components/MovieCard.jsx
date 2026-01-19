import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  return (
    <Link 
      to={`/movie/${movie.movie_id}`} 
      className="group relative block w-full"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-gray-900 transition-all duration-300 group-hover:scale-105 group-hover:z-10 shadow-lg border border-gray-800">
        <img 
          src={movie.poster_url || 'https://via.placeholder.com/300x450?text=No+Poster'} 
          alt={movie.title} 
          className="h-full w-full object-cover"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white font-bold text-sm truncate">{movie.title}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-300">{movie.release_year || 'N/A'}</span>
            <div className="flex gap-2">
               <span className="text-[10px] bg-yellow-500 px-1.5 py-0.5 rounded text-black font-bold">HD</span>
               <div className="flex gap-2">
                <span className="text-[10px] text-yellow-400 font-semibold"><FaStar color="gold" /> {movie.average_rating || '0'}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard