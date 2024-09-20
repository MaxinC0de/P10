import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async({email, password}) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/user/login", {email, password})
            if (response.status === 200) {
                const getToken = response.data.body.token
                sessionStorage.setItem("token", getToken)
                window.location.assign("http://localhost:3000/user")
            } 
        } catch (err) {
            if (err.response.status === 400) {
                alert("Please, ensure that either your credentials are matching or inputs are filled.")
            }
        }
    }
)

export const profile = createAsyncThunk(
    "user/profile", 
    async () => {
        const response = await axios.post(
            "http://localhost:3001/api/v1/user/profile", {},
            { 
                headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-type": "application/json"
                }
            }
        )
        return {
            firstName: response.data.body.firstName,
            lastName: response.data.body.lastName,
            username: response.data.body.userName
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: null,
        firstName: null,
        lastName: null,
        isLoggedIn: false,
        isOpen: false,
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.username = null
            state.firstName = null
            state.lastName = null
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
    },
    extraReducers(builder) {
        builder 
            .addCase(profile.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
                state.username = action.payload.username
            })
            .addCase(profile.pending, (state) => {
                state.status = "loading"
            })
            .addCase(profile.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export const { setInfos, login, logout, setIsOpen } = userSlice.actions
export default userSlice.reducer