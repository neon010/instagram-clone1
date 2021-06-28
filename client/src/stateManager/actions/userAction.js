import {FETCH_USER_REQUEST,FETCH_USER_SUCCESS, FETCH_USER_ERROR} from "./actionTypes";


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
            console.log(json);
            if(json.error) throw json.error;

            dispatch(fetchUserSuccess(json.data));
        } catch (error) {
            console.log(error)
            dispatch(fetchUserError(error));
        }
    }
}