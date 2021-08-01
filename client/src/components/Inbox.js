import {useEffect, useState} from "react";
import {RiChatNewLine} from "react-icons/ri";
import {useSelector, useDispatch} from "react-redux";
import {Link, useRouteMatch} from "react-router-dom"
import {fetchInbox} from "../stateManager"
import { ChatRoom } from "./ChatRoom";
import {CreateChatRoom} from "./ModalsAndPopover/CreateChatRoom";
import {timeDifference} from "../utills/timeDifference";
import {Helmet} from "react-helmet";

export const Inbox = () =>{
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const AuthResponse = useSelector(state => state.AuthResponse);
    const inbox = useSelector(state => state.inboxResponse.inbox);
    const {userDetails} = AuthResponse;

    let {path} = useRouteMatch();


    useEffect(() =>{
        dispatch(fetchInbox())
    }, [dispatch]);

    const createChatRoom = () => {
        console.log("createchatRoom");
        setShowModal(true);
    }

    const {user} = userDetails;
    const loggedInUser = user


    return (
        <div className="message-container">
            <Helmet>
                <title>Messages</title>
            </Helmet>
            <div className="left-container">
                <div style={{display: 'flex', borderBottom: '1px solid #dbdbdb'}}>
                    <h5 style={{marginLeft:"70px"}}>{loggedInUser && loggedInUser.fullName}</h5>
                    <button className="create-chat-button" onClick={createChatRoom}><RiChatNewLine size={25}/></button>
                </div>
                <ul className="contact-list">
                    {(inbox && inbox.length > 0) ? inbox.map((item) =>{
                        const {isGroupChat, latestMessage, users} = item;
                        console.log(latestMessage)
                        return <li key={item._id}>
                        <Link to={`/direct/messages/${item._id}`}>
                            <div className="wrapper">
                                <div className="image-container">
                                    {users.map((user, index) => {
                                        if(index < 3){
                                            if(user._id !== loggedInUser._id){
                                                return  <img 
                                                    src={user.profilePic} 
                                                    alt="profile" 
                                                    width="50" height="50" style={{borderRadius:"50%", objectFit:"cover"}}
                                                    />
                                            }
                                        }
                                    })}
                                </div>
                                <div className="user-div">
                                    <div className="user-info">
                                        {users.map(user => {
                                            if(user._id !== loggedInUser._id){
                                                return  <p>{user.username}</p>
                                            }
                                        })}
                                    </div>
                                    <div  className="latestMessage" style={{display: latestMessage ? "flex": "none"}}>
                                        <div >
                                            <span className="sender">{latestMessage && latestMessage.sender.username}</span>
                                            <span style={{margin:"0 2px 8px 2px", fontWeight:"bold"}}>{latestMessage && "."}</span>
                                            <span className="msg">{latestMessage && latestMessage.content}</span>
                                        </div>
                                        <div className="timestamps">{latestMessage && timeDifference(new Date(), new Date(latestMessage.createdAt)) }</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        </li>

                    }
                        ): <li ><p>inbox is empty</p></li>
                    } 
                </ul>
            </div>
            <div className="vertical-line"></div>
            <div className="right-container">
                {path === "/direct/messages/:id" ? 
                <ChatRoom/> : 
                <div className="send-msg">
                    <button onClick={() => setShowModal(true)}>Send Message</button>
                </div>
                }
            </div>
            <CreateChatRoom showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}