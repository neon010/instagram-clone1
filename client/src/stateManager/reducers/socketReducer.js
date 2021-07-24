import {SOCKET} from "../actions/actionTypes"

export const socketReducer = (state = {}, action) => {
    switch (action.type){
        case SOCKET:
            return action.payload;
        default:
            return state;
    }
}