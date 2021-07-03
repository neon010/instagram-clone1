import {FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS,FETCH_POSTS_ERROR} from "./actionTypes";
import {FETCH_LIKE_POST_REQUEST, FETCH_LIKE_POST_SUCCESS, FETCH_LIKE_POST_ERROR} from "./actionTypes"

import {FETCH_COMMENTS_POST_REQUEST, FETCH_COMMENTS_POST_SUCCESS, FETCH_COMMENTS_POST_ERROR} from "./actionTypes"

const fetchPostsRequest = () =>{
    return {
        type: FETCH_POSTS_REQUEST
    }
}

const fetchPostsSuccess = (posts) =>{
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

const fetchPostsError = (error) =>{
    return {
        type: FETCH_POSTS_ERROR,
        payload: error
    }
}

export const fetchPosts = () =>{
    return async function(dispatch){
        try {
            fetchPostsRequest();
            const res = await fetch('/get-post');
            const json = await res.json();
            console.log(json);
            if(json.error) throw json.error;

            dispatch(fetchPostsSuccess(json.data));
        } catch (error) {
            dispatch(fetchPostsError(error));
        }
    }
}

const fetchLikePostRequest = () =>{
    return {
        type: FETCH_LIKE_POST_REQUEST
    }
}

const fetchLikePostSuccess = (newPost) =>{
    return {
        type: FETCH_LIKE_POST_SUCCESS,
        payload: newPost
    }
}

const fetchLikePostError = (error) =>{
    return {
        type: FETCH_LIKE_POST_ERROR,
        payload: error
    }
}

export const fetchLikeUnlike = (data) =>{
    return async function(dispatch) {
        try{
            fetchLikePostRequest();
            const res = await fetch("/like-unlike-post", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
            const json = await res.json();
            console.log(json);
            if(json.error) throw json.error;
            dispatch(fetchLikePostSuccess(json.data));

        }catch (error){
            dispatch(fetchLikePostError(error));
        }
    }
}

const addCommentsPostRequest = () =>{
    return {
        type: FETCH_COMMENTS_POST_REQUEST
    }
}

const addCommentsPostSuccess = (newPost) =>{
    return {
        type: FETCH_COMMENTS_POST_SUCCESS,
        payload: newPost
    }
}

const addCommentsPostError = (error) =>{
    return {
        type: FETCH_COMMENTS_POST_ERROR,
        payload: error
    }
}

export const addCommentAction = (data) =>{
    return async function(dispatch) {
        try{
            addCommentsPostRequest();
            const res = await fetch("/add-comments", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
            const json = await res.json();
            console.log(json);
            if(json.error) throw json.error;
            dispatch(addCommentsPostSuccess(json.data));

        }catch (error){
            dispatch(addCommentsPostError(error));
        }
    }
}

