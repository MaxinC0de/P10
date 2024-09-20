import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = ({children}) => {
    const token = sessionStorage.getItem("token")
    if (!token) {
        return <Navigate to="/sign-in" replace />
    }
    return children ? children : <Outlet />
}

export default ProtectedRoutes