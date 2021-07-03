import { combineReducers } from "redux";

import {userReducer} from "./userReducer";
import { postsReducer } from "./postsReducer";

const rootReducer = combineReducers({
    AuthResponse: userReducer,
    PostsResponse: postsReducer
})

export default rootReducer