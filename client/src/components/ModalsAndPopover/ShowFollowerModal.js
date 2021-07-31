import Modal from 'react-modal';
import {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux"
import {FaTimes} from "react-icons/fa"
import {BsFillPersonCheckFill} from "react-icons/bs";
import {fetchLoginUser} from "../../stateManager";


Modal.setAppElement('#root');

const customStyles = {
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

export  const ShowFollowerModal = ({showFollowerModal, setShowFollowerModal, value, userId}) =>{
    const [users, setUsers] = useState(null);
    const [isFollowing, setIsFollowing] = useState(null);

    const {userDetails} = useSelector(state => state.AuthResponse);
    const loggedInUser = userDetails.user;

    const handleClose = () =>{
        setShowFollowerModal(false)
    }

    useEffect(() =>{
        if(value){
        fetch(`/followers-followings?data=${value}&userId=${userId}`, {
            method: 'GET',
            headers:{ 
                "Content-Type":"application/json"
            }
        }).then((response) => response.json())
        .then(result => setUsers(result.data))
        }
    }, [value, userId]);

   const history = useHistory() 

   useEffect(() => {
    return history.listen((location, action) => {
        console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
        console.log(`The last navigation action was ${action}`)
        setShowFollowerModal(false);
  })
   },[history, setShowFollowerModal]) 

   useEffect(() => {
    return setUsers(null);
   },[])

   const handleFollowUser = (event) => {
       if(!loggedInUser.following.includes(event.currentTarget.dataset.userid)){
            fetch("/follow-user", {
                method: 'PATCH',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({userId: event.currentTarget.dataset.userid})
            }).then(response => response.json())
            .then(result => {
                if(result.status === "success"){
                    fetchLoginUser();
                }
            })
       };
   }

    return (
        <Modal
        ariaHideApp = {false}
        shouldFocusAfterRender={false}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={false}
        isOpen={showFollowerModal}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="show user modal"
        >
            <div style={{minWidth:"320px"}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems: 'center', borderBottom:"1px solid #DBDBDB", padding:"8px"}}>
                    <div></div>
                    <div>{value}</div>
                    <button onClick={handleClose} style={{border:"none", backgroundColor:"transparent"}}><FaTimes size={25}/></button>
                </div>
                <div style={{height:"300px", overflowY:"scroll"}}>
                    <ul style={{listStyle:"none", margin:"15px", paddingLeft:0}}>
                        {users && users.map(user => <li key={user._id} style={{marginBottom:"8px"}}>
                            <div style={{display:"flex", justifyContent:"space-between", alignItems: 'center'}}>
                                <Link 
                                to={user._id === loggedInUser._id ? `/profile`: `/profile/${user.username}`}
                                style={{display:"flex",justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <img 
                                    src={user.profilePic} 
                                    alt="profile"  width="45" height="45" 
                                    style={{borderRadius:"50%"}}/>
                                    <span 
                                    style={{marginLeft:"10px"}}>{user.username}</span>
                                </Link>
                                <button 
                                data-userid={user._id}
                                style={{
                                    display:(loggedInUser._id === user._id) ? "none":"block",
                                    padding:"7px 10px",
                                    borderRadius:"5px", 
                                    border: "none", 
                                    color: "#fff", 
                                    backgroundColor:"#0095F6"
                                    }}
                                onClick={handleFollowUser}
                                >
                                    {loggedInUser.following.includes(user._id) ? <BsFillPersonCheckFill/> : "Follow"}
                                </button>
                            </div>
                        </li>)}
                    </ul>
                </div>
            </div>
        </Modal>
    )
}