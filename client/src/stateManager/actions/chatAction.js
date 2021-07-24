import {GETCHATID} from "./actionTypes"

export const getChatId = (chatId) =>{
    return {
        type: GETCHATID,
        payload: chatId
    }
}