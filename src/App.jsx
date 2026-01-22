import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Subscribe from './pages/Subscribe'
import MovieDetail from './pages/MovieDetail'
import Profile from './pages/Profile'
import UserList from './pages/UserList'
import UserDetail from './pages/UserDetail'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import ManageMovies from './pages/ManageMovies'

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#141414] min-h-screen text-white font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={
              <ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={
              <ProtectedRoute roleRequired="admin"><UserList /></ProtectedRoute>} />
          <Route path="/admin/users/:id" element={
              <ProtectedRoute roleRequired="admin"><UserDetail /></ProtectedRoute>} />
          <Route path="/admin/movies" element={
              <ProtectedRoute roleRequired="admin"><ManageMovies /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App