import { Link } from 'react-router-dom'
import { Users, Film, LayoutDashboard, ChevronRight } from 'lucide-react'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#141414] text-white p-8 pt-24">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <LayoutDashboard size={36} className="text-yellow-500" />
            Admin Panel
          </h1>
          <p className="text-gray-400 mt-2">Pusat kendali konten dan pengguna diStreaming.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/admin/users" className="group bg-[#181818] p-8 rounded-2xl border border-gray-800 hover:border-yellow-500 transition-all relative overflow-hidden">
            <Users size={48} className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">User Management</h2>
            <p className="text-gray-400">Atur role pengguna, hapus akun, atau lihat daftar member.</p>
            <ChevronRight className="absolute bottom-4 right-4 text-gray-600 group-hover:text-yellow-500" />
          </Link>

          <Link to="/admin/movies" className="group bg-[#181818] p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all relative overflow-hidden">
            <Film size={48} className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">Movie Management</h2>
            <p className="text-gray-400">Tambah film baru, update deskripsi, atau kelola koleksi film.</p>
            <ChevronRight className="absolute bottom-4 right-4 text-gray-600 group-hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard