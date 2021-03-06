import  {FETCH_INBOX_REQUEST, FETCH_INBOX_SUCCESS ,FETCH_INBOX_ERROR, ADD_INBOX} from "./actionTypes";


const fetchInboxRequest = () =>{
    return {
        type: FETCH_INBOX_REQUEST
    }
}

const fetchInboxSuccess = (chats) =>{
    return {
        type: FETCH_INBOX_SUCCESS,
        payload: chats
    }
}

const fetchInboxError = (error) =>{
    return {
        type: FETCH_INBOX_ERROR,
        payload: error
    }
}

export const fetchInbox = () =>{
    return async function(dispatch){
        try {
            fetchInboxRequest();
            const res = await fetch('/user/chats');
            const json = await res.json();
            if(json.status === "failed") throw json.message;

            dispatch(fetchInboxSuccess(json.data));
        } catch (error) {
            dispatch(fetchInboxError(error));
        }
    }
}

const fetchAddInboxSuccess = (inbox) =>{
    return {
        type: ADD_INBOX,
        payload: inbox
    }
}

export const fetchAddInbox = (data) =>{
    return async function(dispatch){
        try {
            fetchInboxRequest();
            const res = await fetch("/create-chat-room", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
            const json = await res.json();
            if(json.status === "failed") throw json.message;

            dispatch(fetchInboxSuccess(json.data));
        } catch (error) {
            dispatch(fetchInboxError(error));
        }
    }
}

