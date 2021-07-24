import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export const SocketClient = () =>{
    const AuthResponse = useSelector(state => state.AuthResponse);
    const socket = useSelector(state => state.Socket);
    const chatId = useSelector(state => state.Chat.chatId);
    const [connected, setConnected] = useState(false);

    const {userDetails} = AuthResponse;

    const loggedInUser = userDetails.user;


    useEffect(() => {
        if(socket.emit){
            socket.emit('joinUser', loggedInUser)
        }
    },[socket, loggedInUser]);

    useEffect(() => {
        if(socket.emit){
            socket.emit("join room", chatId);
        }
    },[socket, chatId]);

    useEffect(() => {
        if(socket.on){
            socket.on("connected", () => setConnected(true));
        }
    },[socket, loggedInUser]);

    useEffect(() => {
        if(socket.on){
            socket.on("notification received", () => {
                console.log("notification received")

            })
        }
    },[socket])

    console.log(connected);
    return (
        <></>
    )
}