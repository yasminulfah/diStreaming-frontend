import { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash2, Edit, Plus, Film } from 'lucide-react'

const ManageMovies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://api-kamu.railway.app/api/movies')
      setMovies(response.data.data)
    } catch (error) {
      console.error("Gagal mengambil data film", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Film className="text-blue-500" /> Manage Movies
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
            <Plus size={20} /> Add New Movie
          </button>
        </div>

        <div className="bg-[#181818] rounded-xl overflow-hidden border border-gray-800">
          <table className="w-full text-left">
            <thead className="bg-[#202020] text-gray-400 uppercase text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Year</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Genre/Lang</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-[#252525] transition-colors">
                  <td className="p-4 font-medium">{movie.title}</td>
                  <td className="p-4 text-gray-400">{movie.release_year}</td>
                  <td className="p-4 text-gray-400">{movie.duration} min</td>
                  <td className="p-4">
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs">{movie.language}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 hover:bg-blue-500/20 text-blue-500 rounded-lg transition">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition">
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
  )
}

export default ManageMovies