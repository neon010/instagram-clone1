import {SOCKET} from "./actionTypes";

export const fetchSocket = (socket) => {
    return {
        type: SOCKET,
        payload: socket
    }
}