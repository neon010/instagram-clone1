import Modal from 'react-modal';
import {useEffect, useState, useRef} from "react";
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux";
import {fetchInbox} from "../../stateManager"

import {FaTimes} from "react-icons/fa"

Modal.setAppElement('#root');

const customStyles = {
    overlay: { backgroundColor: '#000', opacity:0.8},
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0px',
      zIndex: 100,
      boxShadow: '2px -4px 5px 0px rgba(0,0,0,0.75)'
    },
};

export const CreateChatRoom = ({showModal, setShowModal}) => {

    const [keywords, setKeywords] = useState("");

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const dispatch = useDispatch();

    const myRef = useRef(null);
    const history = useHistory();

    useEffect(() =>{
        fetch("/search-user", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({keywords})
        })
        .then(res => res.json())
        .then(result => {
            setUsers(result.data)
        });
    }, [keywords]);



    const handleClose = () =>{
        setShowModal(false);
    }

    const handleCreateChatRoom = (event) =>{
        event.preventDefault();
        console.log(selectedUser);
        // if(!selectedUser) return console.log("Please select a user");
        const data = {selectedUser}

        fetch("/create-chat-room", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if(result.status === "success"){
                console.log(result);
                history.push(`/direct/messages/${result.data._id}`)
                setShowModal(false);
                dispatch(fetchInbox());
            }
        });
    }


    return (
        <Modal
        shouldFocusAfterRender={false}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={false}
        isOpen={showModal}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="create chat room modal"
        >
            <div className="create-chat-room">
                <div className="upper-container">
                    <span onClick={() => setShowModal(false)}><FaTimes size={25}/></span>
                    <span>New Message</span>
                </div>
                <div className="form-container">
                    <form onSubmit={handleCreateChatRoom}>
                        <div className="input-container">
                            <label>To</label>
                            <input type="text" 
                            value={keywords}
                            onChange={(event) => setKeywords(event.target.value)}
                            placeholder="Search..."/>
                        </div>
                        <div className="selectedUser">
                            {
                                selectedUser && selectedUser.map( (user, index)=> 
                                <li key={user._id} ref={myRef} value={user._id}>
                                    <span>{user.username}</span>
                                    <span 
                                    data-id={user._id} 
                                    onClick={(event)=> {
                                        const userID = (event.currentTarget.dataset.id)
                                        setSelectedUser(state => {
                                            return state.filter(user => user._id !== userID)
                                        })
                                    }}><FaTimes size={15} color="red" style={{marginLeft:"5px"}}/></span>
                                </li>)
                            }
                        </div>
                        <div className="search-results">
                            {users && users.map(user => {
                                return <li  key={user._id}>
                                    <div className="user-info">
                                        <img src={user.profilePic} alt="user profile " width="30" height="30" style={{borderRadius:"50%"}}/>
                                        <p>{user.fullName}</p>
                                    </div>
                                    <div>
                                        <input 
                                        type="checkbox" 
                                        value={JSON.stringify(user)}
                                        onChange = {(event) => {
                                            if(event.target.checked){
                                                setSelectedUser([...selectedUser, JSON.parse(event.target.value)])
                                            }else {
                                                setSelectedUser(state => {
                                                    console.log(state);
                                                    console.log(JSON.parse(event.target.value))
                                                    if(state !== undefined){
                                                        return state.filter(user => user._id !== JSON.parse(event.target.value)._id)
                                                    }else{
                                                        return []
                                                    }
                                                })
                                            }
                                        }}
                                        />
                                    </div>
                                </li>
                            })}
                        </div>
                        <div className="submit-btn">
                            <button type="submit">Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}