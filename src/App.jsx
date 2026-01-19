import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Subscribe from './pages/Subscribe'
import MovieDetail from './pages/MovieDetail'
import Profile from './pages/Profile'
import ProtectedRoute from './routes/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#141414] min-h-screen text-white font-sans">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App