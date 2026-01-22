import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, roleRequired }) => {
    const token = localStorage.getItem("access_token")
    const user = JSON.parse(localStorage.getItem("user"))

    if (!token) {
        return <Navigate to="/login" />
    }

    if (roleRequired === "admin" && user?.role !== "admin") {
        return <Navigate to="/" />
    }

    return children ? children : <Outlet />
}

export default ProtectedRoute