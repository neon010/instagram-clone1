import {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {getChatId} from "../stateManager";
import dots from "../images/dots.gif"

export const ChatRoom = () =>{
    const [chats, setChats] = useState([]);
    const [showTypingDots, setShowTypingDots] = useState(false);
    const [chatDetails, setChatDetails] = useState({});
    const [content, setContent] = useState("");
    const chatId = useSelector(state => state.Chat.chatId);

    const {id} = useParams();
    const AuthResponse = useSelector(state => state.AuthResponse);
    const socket = useSelector(state => state.Socket);

    const {userDetails} = AuthResponse;

    const loggedInUser = userDetails.user;



    const dispatch = useDispatch();

    useEffect(() => {
        if(id){
            dispatch(getChatId(id));
        }
    },[id, dispatch])

    useEffect(() => {
        if(socket && chatId){
            socket.emit("join room", chatId);
        }
    }, [socket, chatId])


    useEffect(() =>{
        fetch(`/user/chat/${id}`)
        .then((response) => response.json())
        .then(result => {
            if(result.status === "success"){
                setChatDetails(result.data);

            }
        })
    },[id]);

    useEffect(() => {
        fetch(`/chats/${id}/messages`)
        .then((response) => response.json())
        .then(result => {
            if(result.status === "success"){
                setChats(result.data)
            }
        })
    },[id]);

    const handleKeyDown = (event) => {
        if(event.type === 'keydown'){
            socket.emit('typing', chatId);
        }
    }

    const handlesendMessage = useCallback(async () => {
        console.log(content)
        const data = {content, chatId:id}
        fetch("/send-Message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            if(result.status === "success"){
                if(socket.emit){
                    socket.emit("new message", result.data);
                }
                setChats(state => [...state, result.data]);
                setShowTypingDots(false)
                setContent("");
            }else{
                console.log(result.message);
            }
        });
    },[content, id, socket]);

    useEffect(() => {
        if(socket.on && !showTypingDots){
            socket.on("typing", () => {
                console.log(`typing`)
                setShowTypingDots(true);
            });
        }
    }, [socket, showTypingDots]);

    useEffect(() => {
        if(socket.on){
            socket.on("stop typing", () => setShowTypingDots(false));
        }
    }, [socket, chatId]);

    useEffect(() => {
        let lastTypingTime = new Date().getTime();
        const timerLength = 3000;

        setTimeout(() => {
            const timeNow = new Date().getTime();
            const timeDiff = timeNow - lastTypingTime;
    
            if(timeDiff >= timerLength && showTypingDots) {
                socket.emit("stop typing", chatId);
                setShowTypingDots(false);
            }
        }, timerLength);
    }, [socket, showTypingDots, chatId]);

    useEffect(() =>{
        if(socket.on){
            socket.on("message received", (newMessage) => {
                console.log(newMessage)
                setChats(state => [...state, newMessage])
            });
        }
    }, [socket]);


    return (
        <div>
            <ul style={{listStyle:"none", display: "flex", borderBottom:"1px solid #DBDBDB"}}>
                {
                chatDetails && chatDetails.users && chatDetails.users.map(user => {
                    if(user._id !== loggedInUser._id){
                        return <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} key={Math.random()*10000000000}>
                        <img src={user.profilePic} alt="profile" width="45" height="45" style={{borderRadius:"50%"}}/>
                        <span style={{marginLeft:"5px"}}>{user.fullName}</span>
                    </li>
                    }
                })
                }
            </ul>
            <div className="chatContainer">
                <div >
                    <ul className="chatMessages">
                    {
                            chats ? chats.map(chat => 
                                <li 
                                key={Math.random()*10000000}
                                className={chat.sender._id === loggedInUser._id ? "message mine" : "message theirs"}>
                                    {/* ${imageContainer} */}
                                    <div className='messageContainer'>
                                        <span className='senderName'>
                                            {chat.sender.fullName}
                                        </span>
                                        <span className='messageBody'>
                                            {chat.content}
                                        </span>
                                    </div>
                                </li>
                                ): null
                            }
                    </ul>
                </div>
                <div className="typingDots" style={{display: showTypingDots ? "block": 'none'}}>
                    <img src={dots} alt="typing dots" width="40" height="40" />
                </div>
                <div className="footer">
                    <button>😀</button>
                    <textarea 
                    placeholder="Message..." 
                    className="inputTextbox" 
                    value={content}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setContent(event.target.value)}
                    />
                    <button
                    onClick={handlesendMessage}
                    >send</button>
                </div>
            </div>
        </div>
    )
}