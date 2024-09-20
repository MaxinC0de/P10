import logo from "../assets/images/logo.webp"
import user from "../assets/images/user.png"
import out from "../assets/images/sign-out.png"
import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../slices/user"

export default function Header() {
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
        dispatch(login())
    })

    const signOut = async () => {
        setTimeout(() => {
            sessionStorage.removeItem("token")
            dispatch(logout())
            window.location.assign("http://localhost:3000/sign-in")
        }, 100)
    }

    const userName = useSelector((state) => state.editUsername.username)
    const username = useSelector((state) => state.user.username)

    return(
        <>
            <nav className="main-nav">
                <NavLink className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                    <NavLink className="main-nav-item" to="/sign-in">
                        {location.pathname === "/user" ? 
                            <>
                                <img src={user} alt="" className="user-img"/>
                                <p>{userName === null ? username : userName}</p>
                                <img src={out} alt="" className="user-img" />
                                <p onClick={signOut}>Sign Out</p>
                            </> :
                            <>
                                <img src={user} alt="" className="user-img"/>
                                <p>Sign In</p>
                            </>
                        }
                    </NavLink>
                </div>
            </nav>
        </>
    )
}