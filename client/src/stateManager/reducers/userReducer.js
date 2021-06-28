import {FETCH_USER_REQUEST,FETCH_USER_SUCCESS, FETCH_USER_ERROR} from "../actions/actionTypes";

const intialState = {
    isLogin: null,
    loading: true,
    user: null,
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
                user:action.payload,
                isLogin: true,
                error: ""
            }
        case FETCH_USER_ERROR:
            return {
                loading: false,
                user: null,
                isLogin: false,
                error: action.payload
            }
        default:
            return state
    }
}