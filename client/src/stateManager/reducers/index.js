import { combineReducers } from "redux";

import {userReducer} from "./userReducer"

const rootReducer = combineReducers({
    AuthResponse: userReducer
})

export default rootReducer