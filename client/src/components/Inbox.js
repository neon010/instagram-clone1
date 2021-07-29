import {useEffect, useState} from "react";
import {RiChatNewLine} from "react-icons/ri";
import {useSelector, useDispatch} from "react-redux";
import {Link, useRouteMatch} from "react-router-dom"
import {fetchInbox} from "../stateManager"
import { ChatRoom } from "./ChatRoom";
import {CreateChatRoom} from "./ModalsAndPopover/CreateChatRoom"

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
    console.log(loggedInUser)

    return (
        <div className="message-container">
            <div className="left-container">
                <div style={{display: 'flex', borderBottom: '1px solid #dbdbdb'}}>
                    <h5 style={{marginLeft:"70px"}}>{loggedInUser && loggedInUser.fullName}</h5>
                    <button className="create-chat-button" onClick={createChatRoom}><RiChatNewLine size={25}/></button>
                </div>
                <ul className="contact-list">
                    {(inbox && inbox.length > 0) ? inbox.map((item) =>
                            <li key={item._id} style={{marginBottom:"10px"}}>
                                <Link to={`/direct/messages/${item._id}`} style={{display: 'flex', textDecoration:"none"}}>
                                    {item.users.map(user => {
                                        if(user._id !== loggedInUser._id){
                                            return <li>
                                                        <img src={user.profilePic} alt="profile" width="30" height="30" style={{borderRadius:"50%"}}/>
                                                        {user.fullName}
                                                    </li>
                                        }
                                    }
                                )}
                                </Link>
                            </li>
                        ): <li ><p>inbox is empty</p></li>
                    } 
                </ul>
            </div>
            <div className="vertical-line"></div>
            <div className="right-container">
                {path === "/direct/messages/:id" ? 
                <ChatRoom/> : 
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <button 
                    onClick={() => setShowModal(true)}
                    style={{padding: "8px 10px", color: '#fff', background:"#0095F6", border:"none", borderRadius:"5px"}}>Send Message</button>
                </div>
                }
            </div>
            <CreateChatRoom showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}