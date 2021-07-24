import Modal from 'react-modal';
import {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux"



Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '28%',
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

export  const ShowUserModal = ({showModal, setShowModal, keywords}) =>{

    const [users, setUsers] = useState([]);
    const loggedInUser = useSelector(state => state.AuthResponse.userDetails.user);



    const handleClose = () =>{
        setShowModal(false);
    }

    useEffect(() =>{
        fetch("/search-user", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({keywords})
        })
        .then(res => res.json())
        .then(result => setUsers(result.data));
    }, [keywords])

   const history = useHistory() 

   useEffect(() => {
    return history.listen((location, action) => {
        console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
        console.log(`The last navigation action was ${action}`)
        setShowModal(false);
  })
   },[history, setShowModal]) 

    return (
        <Modal
        // ariaHideApp = {false}
        shouldFocusAfterRender={false}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={false}
        isOpen={showModal}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="show user modal"
        >
            <div style={{minWidth:"250px", minHeight:"200px", padding: "20px"}}>
                {users ? (
                    <ul style={{listStyle:"none"}}>
                        {users.map(user => 
                        <li style={{marginBottom: "10px"}} key={Math.random()*10000000000}>
                            <Link 
                            to={user.username === loggedInUser.username ? `/profile/`: `/profile/${user.username}`} 
                            style = {{display: 'flex', alignItems: 'center'}}>
                                <img src={user.profilePic} alt="profile" width="50" height="50" style={{borderRadius:"50%", marginRight:"10px"}}/>
                                {user.fullName}
                            </Link>
                        </li>)}
                    </ul>): "No users found"}</div>
        </Modal>
    )
}