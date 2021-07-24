import {FETCH_NOTIFICATION_REQUEST, 
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_ERROR,
    FETCH_NOTIFICATION_OPEN
} from "../actions/actionTypes";

const initialState = {
    loading: true,
    notifications: [],
    error: ""
}

export const notificationsReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_NOTIFICATION_REQUEST: return {
            ...state,
            loading: true,
            error: ""
        }
        case FETCH_NOTIFICATION_SUCCESS: return {
            ...state,
            loading: false,
            notifications: action.payload,
            error: ""
        }
        case FETCH_NOTIFICATION_OPEN: return {
            ...state,
            notifications: state.notifications.map(notification => notification._id === action.payload._id ? action.payload : notification)
        }
        case FETCH_NOTIFICATION_ERROR: return {
            ...state,
            loading: false,
            notifications: [],
            error: action.payload
        }
        default: return {
            ...state
        }
    }
}