import {useState, useEffect} from "react";
import  {useSelector, useDispatch} from "react-redux";
import { AddImageModal } from "./ModalsAndPopover/AddImageModal";

export const Profile = () =>{
    const profile = useSelector(state => state.AuthResponse.user);

    const [showModal, setShowModal] = useState(false);

    useEffect(() =>{
        console.log("profile");
    }, [profile])


    const handleClose = () => setShowModal(false);

    console.log(profile);

    return (
        <div className="profile-container" id="profile-container">
            <div className="profile-info">
                <div className="profile-image">
                    <img 
                    src={profile.profilePic} 
                    alt="profile-image" 
                    onClick={()=> setShowModal(true)}
                    />
                    <AddImageModal showModal={showModal} handleClose={handleClose} setShowModal={setShowModal}/>
                </div>
                <div className="profile-user-info">
                    <div className="profile-username">
                        <h2>{profile.username}</h2>
                        <button className="">Edit Profile</button>
                    </div>
                    <div className="profile-followers">
                        <button >
                            <span style={{fontWeight:"bold", marginRight:"5px"}}>0</span>
                            <span style={{color:"#898989"}}>posts</span>
                        </button>
                        <button>
                            <span style={{fontWeight:"bold", marginRight:"5px"}}>{profile.followers.length}</span>
                            <span style={{color:"#898989"}}>followers</span>
                        </button>
                        <button>
                            <span style={{fontWeight:"bold", marginRight:"5px"}}>{profile.following.length}</span>
                            <span style={{color:"#898989"}}>following</span>
                        </button>
                    </div>
                    <div className="profile-fullName">{profile.fullName}</div>
                </div>
            </div>
            <div className="profile-item">

            </div>
        </div>
    )
}