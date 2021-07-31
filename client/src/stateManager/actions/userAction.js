import {FETCH_USER_REQUEST,FETCH_USER_SUCCESS, FETCH_USER_ERROR} from "./actionTypes";
import {FETCH_USER_UPDATE_PIC_REQUEST, FETCH_USER_UPDATE_PIC_SUCCESS, FETCH_USER_UPDATE_PIC_ERROR} from "./actionTypes";
import {FETCH_USER_REMOVE_PIC_REQUEST, FETCH_USER_REMOVE_PIC_SUCCESS, FETCH_USER_REMOVE_PIC_ERROR} from "./actionTypes";
import {FETCH_USER_REFRESH_REQUEST, FETCH_USER_REFRESH_SUCCESS, FETCH_USER_REFRESH_ERROR} from "./actionTypes";
import {UPDATE_USER_PROFILE} from "./actionTypes"

const fetchUserRequest = () =>{
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (user) =>{
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

export const fetchUserError = (error) =>{
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}

export const fetchLoginUser = () =>{
    return async function(dispatch) {
        try {
            dispatch(fetchUserRequest());
            const res = await fetch('/current-user');
            const json = await res.json();
            // console.log(json);
            // if(json.error) throw json.error;
            if(json.status === "success"){
                dispatch(fetchUserSuccess(json.data));
            }else{
                throw json.message
            }
        } catch (error) {
            console.log("ftch user error: " + error)
            dispatch(fetchUserError(error));
        }
    }
}

const fetchUserUpadteProfilePicRequest = () =>{
    return {
        type: FETCH_USER_UPDATE_PIC_REQUEST
    }
}

const fetchUserUpadteProfilePicSuccess = (user) =>{
    return {
        type: FETCH_USER_UPDATE_PIC_SUCCESS,
        payload: user
    }
}

const fetchUserUpadteProfilePicError = (error) =>{
    return {
        type: FETCH_USER_UPDATE_PIC_ERROR,
        payload: error
    }
}

export const updateProfilePic = (data) =>{
    return async function(dispatch) {
        try {
            dispatch(fetchUserUpadteProfilePicRequest());
            const res = await fetch("/upload-profile-pic", {
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
              });
            const json = await res.json();
            console.log(json);
            if(json.error) throw json.error;

            dispatch(fetchUserUpadteProfilePicSuccess(json.data));
        } catch (error) {
            console.log(error)
            dispatch(fetchUserUpadteProfilePicError(error));
        }
    }
}

const fetchUserRemoveProfilePicRequest = () =>{
    return {
        type: FETCH_USER_REMOVE_PIC_REQUEST
    }
}

const fetchUserRemoveProfilePicSuccess = (user) =>{
    return {
        type: FETCH_USER_REMOVE_PIC_SUCCESS,
        payload: user
    }
}

const fetchUserRemoveProfilePicError = (error) =>{
    return {
        type: FETCH_USER_REMOVE_PIC_ERROR,
        payload: error
    }
}

export const fetchUserRemovePic = () =>{
    return async function(dispatch) {
        try {
            dispatch(fetchUserRemoveProfilePicRequest());
            const res = await fetch("/remove-profile-pic", {
                method: "PATCH"
            })
            const json = await res.json();
            // console.log(json);
            if(json.error) throw json.error;

            dispatch(fetchUserRemoveProfilePicSuccess(json.data));
        } catch (error) {
            console.log(error)
            dispatch(fetchUserRemoveProfilePicError(error));
        }
    }
}

const fetchUserRefreshRequest = () =>{
    return {
        type: FETCH_USER_REFRESH_REQUEST
    }
}

const fetchUserRefreshSuccess = (user) =>{
    return {
        type: FETCH_USER_REFRESH_SUCCESS,
        payload: user
    }
}

const fetchUserRefreshError = (error) =>{
    return {
        type: FETCH_USER_REFRESH_ERROR,
        payload: error
    }
}


export const fetchRefreshUser = () =>{
    return async function(dispatch) {
        try {
            dispatch(fetchUserRefreshRequest());
            const res = await fetch('/current-user');
            const json = await res.json();
            // console.log(json);
            // if(json.error) throw json.error;
            if(json.status === "success"){
                dispatch(fetchUserRefreshSuccess(json.data));
            }else{
                throw json.message
            }
        } catch (error) {
            console.log("ftch user error: " + error)
            dispatch(fetchUserRefreshError(error));
        }
    }
}

const updateUserProfileSuccess = (user) =>{
    return {
        type: UPDATE_USER_PROFILE,
        payload: user
    }
}


export const updateUserProfile = (data) =>{
    return async function(dispatch) {
        try {
            dispatch(fetchUserRefreshRequest());
            const res = await fetch('/update-profile', {
                method: 'PATCH',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            console.log(json);
            // if(json.error) throw json.error;
            if(json.status === "success"){
                dispatch(updateUserProfileSuccess(json.data));
            }else{
                throw json.message
            }
        } catch (error) {
            console.log({error})
            dispatch(fetchUserRefreshError(error));
        }
    }
}