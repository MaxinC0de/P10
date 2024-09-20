import Header from "../../components/header"
import Footer from "../../components/footer"
import user from "../../assets/images/user.png"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { loginUser } from "../../slices/user"

export default function SignPage() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const logIn = async (data) => {
        const result = await dispatch(loginUser({
            email: data.email,
            password: data.password
        })).unwrap()
    }

    return(
        <div className="d">
            <Header />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <img src={user} alt="" className="user-img-main"/>
                    <h1>Sign In</h1>
                        <form onSubmit={handleSubmit(logIn)}> 
                            <div className="input-wrapper">               
                                <label htmlFor="email">Email</label>
                                <input name="email" type="email" {...register("email")} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" {...register("password")} />
                            </div>
                            <span className="remember-div">
                                <label htmlFor="remember">Remember me</label>
                                <input name="remember" type="checkbox" className="input-wrapper-remember"/>
                            </span>
                        <button className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
}