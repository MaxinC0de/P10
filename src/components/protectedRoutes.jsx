import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
    console.log("ok")
    const token = sessionStorage.getItem("token")
    console.log(token)
    return token ? <Outlet /> : <Navigate to="/user" />
}

export default ProtectedRoutes