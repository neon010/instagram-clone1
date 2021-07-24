import { GETCHATID} from "../actions/actionTypes";

export const chatReducer = (state={}, action) =>{
    switch(action.type){
        case GETCHATID: return {
            chatId: action.payload
        }
        default: return state
    }
}