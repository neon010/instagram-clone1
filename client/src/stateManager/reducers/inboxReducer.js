import  {FETCH_INBOX_REQUEST, FETCH_INBOX_SUCCESS ,FETCH_INBOX_ERROR, ADD_INBOX} from "../actions/actionTypes";


const intialState ={
    loading: false,
    inbox:null,
    error:null
}

export const inboxReducer = (state = intialState, action) =>{

    switch(action.type){
        case FETCH_INBOX_REQUEST: return {
            loading: true,
            inbox:null,
            error:null
        }
        case FETCH_INBOX_SUCCESS: return {
            loading: false,
            inbox:action.payload,
            error:null
        }
        case ADD_INBOX: return {
            loading: false,
            inbox: [...state.inbox, action.payload],
            error:null
        }
        case FETCH_INBOX_ERROR: return {
            loading: false,
            inbox:null,
            error:action.payload
        }
        default: return {
            ...state
        }
    }
}