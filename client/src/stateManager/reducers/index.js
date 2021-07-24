import { combineReducers } from "redux";

import {userReducer} from "./userReducer";
import { postsReducer } from "./postsReducer";
import { inboxReducer } from "./inboxReducer";
import { socketReducer } from "./socketReducer";
import { chatReducer } from "./chatReducer";
import {notificationsReducer} from "./notificationReducer";

const rootReducer = combineReducers({
    AuthResponse: userReducer,
    PostsResponse: postsReducer,
    inboxResponse: inboxReducer,
    Socket: socketReducer,
    Chat: chatReducer,
    NotificationResponse: notificationsReducer,
})

export default rootReducer