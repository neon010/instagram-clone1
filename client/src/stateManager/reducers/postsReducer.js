import {FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS,FETCH_POSTS_ERROR} from "../actions/actionTypes";
import {FETCH_LIKE_POST_REQUEST, FETCH_LIKE_POST_SUCCESS, FETCH_LIKE_POST_ERROR} from "../actions/actionTypes";
import {FETCH_COMMENTS_POST_REQUEST, FETCH_COMMENTS_POST_SUCCESS, FETCH_COMMENTS_POST_ERROR} from "../actions/actionTypes";

const initialState = {
    loading: true,
    posts: [],
    error: ""
}

export const postsReducer = (state = initialState, action) =>{

    switch(action.type){
        case FETCH_POSTS_REQUEST: return {
            ...state,
            loading: true,
            error: ""
        }
        case FETCH_POSTS_SUCCESS: return {
            ...state,
            loading: false,
            posts: action.payload,
            error: ""
        }
        case FETCH_POSTS_ERROR: return {
            ...state,
            loading: false,
            posts: [],
            error: action.payload
        }
        case FETCH_LIKE_POST_REQUEST: return {
            ...state,
        }
        case FETCH_LIKE_POST_SUCCESS: return {
            ...state,
            posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
        }
        case FETCH_LIKE_POST_ERROR: return {
            ...state,
            error: action.payload
        }
        case FETCH_COMMENTS_POST_REQUEST: return {
            ...state,
        }
        case FETCH_COMMENTS_POST_SUCCESS: return {
            ...state,
            posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
        }
        case FETCH_COMMENTS_POST_ERROR: return {
            ...state,
            error: action.payload
        }
        default: return{
            ...state
        }
    }
}