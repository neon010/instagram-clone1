import {FETCH_USER_REQUEST,FETCH_USER_SUCCESS, FETCH_USER_ERROR} from "../actions/actionTypes";
import {FETCH_USER_UPDATE_PIC_REQUEST, FETCH_USER_UPDATE_PIC_SUCCESS, FETCH_USER_UPDATE_PIC_ERROR} from "../actions/actionTypes";
import {FETCH_USER_REMOVE_PIC_REQUEST, FETCH_USER_REMOVE_PIC_SUCCESS, FETCH_USER_REMOVE_PIC_ERROR} from "../actions/actionTypes";
import {FETCH_USER_REFRESH_REQUEST, FETCH_USER_REFRESH_SUCCESS, FETCH_USER_REFRESH_ERROR, UPDATE_USER_PROFILE} from "../actions/actionTypes";

const intialState = {
    isLogin: null,
    loading: true,
    userDetails: null,
    error:""
}

export const userReducer = (state = intialState, action) =>{
    switch(action.type){
        case FETCH_USER_REQUEST:
            return {
                ...state,
                isLogin: false,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                userDetails:action.payload,
                isLogin: true,
                error: ""
            }
        case FETCH_USER_ERROR:
            console.log(action.payload)
            return {
                loading: false,
                userDetails: null,
                isLogin: false,
                error: action.payload
            }
        case FETCH_USER_UPDATE_PIC_REQUEST: return {
            ...state,
            isLogin: false,
            loading: true
        }
        case FETCH_USER_UPDATE_PIC_SUCCESS: return {
            loading: false,
            userDetails:action.payload,
            isLogin: true,
            error: ""
        }
        case FETCH_USER_UPDATE_PIC_ERROR: return {
            loading: false,
            userDetails: null,
            isLogin: false,
            error: action.payload
        }
        case FETCH_USER_REMOVE_PIC_REQUEST: return {
            ...state,
            isLogin: false,
            loading: true
        }
        case FETCH_USER_REMOVE_PIC_SUCCESS: return {
            loading: false,
            userDetails:action.payload,
            isLogin: true,
            error: ""
        }
        case FETCH_USER_REMOVE_PIC_ERROR: return {
            loading: false,
            userDetails: null,
            isLogin: false,
            error: action.payload
        }
        case FETCH_USER_REFRESH_REQUEST: return {
            ...state,
        }
        case FETCH_USER_REFRESH_SUCCESS: return {
            ...state,
            userDetails:action.payload,
        }
        case UPDATE_USER_PROFILE: return {
            ...state,
            userDetails:action.payload,
        }
        case FETCH_USER_REFRESH_ERROR: return {
            ...state,
            error: action.payload
        }
        default:
            return state
    }
}