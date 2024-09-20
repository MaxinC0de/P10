import Header from "../../components/header"
import Footer from "../../components/footer"
import Account from "../../components/account"
import jsonData from "../../assets/data.json"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { login, setIsOpen, profile } from "../../slices/user"
import { editUsername } from "../../slices/editUsername"

export default function User() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()    
    const firstName = useSelector((state) => state.user?.firstName)
    const lastName = useSelector((state) => state.user?.lastName)
    const userName = useSelector((state) => state.editUsername.username)

    const username = useSelector((state) => state.user.username)
        
    const isOpen = useSelector((state) => state.user?.isOpen)
    const isLoggedIn = useSelector((state) => state.user?.isLoggedIn)
    const data = jsonData.inputs
    const placeholders = [userName === null ? username : userName, firstName || "", lastName || ""]
    
    const onSubmit = (Data) => {
        dispatch(editUsername(Data.username))
        dispatch(setIsOpen(false))
    }
 
    useEffect(() => {
        dispatch(profile())
        if(!isLoggedIn) {
            dispatch(login())
        }
    }, [dispatch, isLoggedIn])

    const toggleEditUsername = () => {
        dispatch(setIsOpen({isOpen: !isOpen}))
    }

    return(
        <>
            <Header />
                <main className="main bg-dark">
                    <div className="header">
                        <h1>Welcome back <br/>{userName === null ? username : userName}</h1>
                        <button className="edit-button" onClick={toggleEditUsername}>Edit Name</button>
                        {isOpen && 
                            <form className="m-wrap" onSubmit={handleSubmit(onSubmit)}>
                                <div className="lalala">
                                    {Array.from({length: 3}, (_, index) => (
                                        <div className="edit-wrapper" key={index}>
                                            <label htmlFor={data.labels[index]}>{data.texts[index]}</label>
                                            <input 
                                                name={data.labels[index]} 
                                                type="text" className="input2" 
                                                placeholder={placeholders[index]} 
                                                disabled={data.states[index]} 
                                                {...(index === 0 ? {...register("username")} : {})}/>
                                        </div>
                                    ))}      
                                </div>
                                <div className="la">
                                    <button type="submit" className="lala">Save</button>
                                    <button className="lala" onClick={toggleEditUsername}>Cancel</button>
                                </div>
                            </form>
                        }
                    </div>
                    <h2 className="sr-only">Accounts</h2>
                    <Account title="Argent Bank Checking" text="Available Balance" amount="$2,082.79" />
                    <Account title="Argent Bank Savings" text="Available Balance" amount="$10,928.42" />
                    <Account title="Argent Bank Credit Card" text="Current Balance" amount="$184.30" />
                </main>
            <Footer />
        </>
    )
}