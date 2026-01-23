import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserList = () => {
    const [users, setUsers] = useState([])
    const [pagination, setPagination] = useState({})
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('access_token')
                const response = await axios.get(`https://distreaming-backend1-production.up.railway.app/api/users?page=${page}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                
                setUsers(response.data.data.data)
                setPagination(response.data.data)
                setLoading(false)
            } catch (err) {
                console.error("Failed to get users", err)
                setLoading(false)
            }
        }

        getUsers()
    }, [page])

    if (loading) return <div className="text-white text-center mt-20">Loading Users...</div>

    return (
        <div className="min-h-screen bg-[#141414] px-8 py-24">
            <h1 className="text-white text-3xl font-bold mb-8">Manage Users</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {users.map((user) => (
                    <div key={user.user_id} className="bg-[#181818] rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500 transition-all group">
                        <div className="aspect-square bg-gray-700 flex items-center justify-center text-4xl font-bold text-yellow-500">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="p-4">
                            <h3 className="text-white font-bold truncate">{user.username}</h3>
                            <p className="text-gray-400 text-sm truncate">{user.email}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded font-bold uppercase">
                                    {user.role}
                                </span>
                                <Link 
                                    to={`/admin/users/${user.user_id}`} 
                                    className="text-white text-sm hover:underline"
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex justify-center items-center gap-4">
                <button 
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-white/10 text-white rounded disabled:opacity-30 hover:bg-white/20 transition"
                >
                    Previous
                </button>
                
                <span className="text-white">
                    Page <span className="text-yellow-500 font-bold">{pagination.current_page}</span> of {pagination.last_page}
                </span>

                <button 
                    onClick={() => setPage(prev => Math.min(prev + 1, pagination.last_page))}
                    disabled={page === pagination.last_page}
                    className="px-4 py-2 bg-white/10 text-white rounded disabled:opacity-30 hover:bg-white/20 transition"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default UserList