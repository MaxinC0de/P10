import { combineReducers } from "redux"
import userReducer from "./user"
import editUsernameReducer from "./editUsername"

const rootReducer = combineReducers({
    user: userReducer, 
    editUsername: editUsernameReducer
})

export default rootReducer