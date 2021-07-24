import Modal from 'react-modal';
import {useEffect, useState, useRef} from "react";

import {FaTimes} from "react-icons/fa"

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '45%',
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

    const myRef = useRef(null);

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
            // console.log(result.data);
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
        console.log(data);
        fetch("/create-chat-room", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
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
                <div>
                    <span onClick={() => setShowModal(false)}><FaTimes size={25}/></span>
                    <span>New Message</span>
                </div>
                <div>
                    <form onSubmit={handleCreateChatRoom}>
                    <div>
                        <label>
                            <span>To :</span>
                            <input type="text" 
                            value={keywords}
                            onChange={(event) => setKeywords(event.target.value)}
                            placeholder="Search"/>
                        </label>
                    </div>
                    <div>
                        {
                            selectedUser && selectedUser.map( (user, index)=> 
                            <li key={index} ref={myRef} value={user._id}>
                                <span>{user.fullName}</span>
                                <span 
                                data-id={user._id} 
                                onClick={(event)=> {
                                    const userID = (event.currentTarget.dataset.id)
                                    setSelectedUser(state => {
                                        console.log(userID)
                                        console.log(state)
                                        return state.filter(user => user._id !== userID)
                                    })
                                }}><FaTimes size={20}/></span>
                            </li>)
                        }
                    </div>
                        <div>
                            {users && users.map(user => {
                                // console.log(user)
                                return <li style={{display: 'flex'}} key={user._id}>
                                    <div style={{display: 'flex'}}>
                                        <img src={user.profilePic} alt="user profile " width="40" height="40" style={{borderRadius:"50%"}}/>
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
                        <div>
                        <button type="submit">Create chat room</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}