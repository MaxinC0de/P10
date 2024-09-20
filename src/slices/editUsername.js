import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const editUsername = createAsyncThunk("user/editUsername", async (username) => {
    try {
        await axios.put(
            "http://localhost:3001/api/v1/user/profile", {userName: username},
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-type": "application/json"
                }
            }
        )
        return username
    } catch (err) {
        console.log("Error is :", err)
        throw err
    }
})

const usernameSlice = createSlice({
    name: "editUsername",
    initialState: {
        username: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(editUsername.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.username = action.payload
            })
            .addCase(editUsername.pending, (state) => {
                state.status = "loading"
            })
            .addCase(editUsername.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export default usernameSlice.reducer