import {useState} from "react";
import  {useSelector, useDispatch} from "react-redux";
import { AddImageModal } from "./ModalsAndPopover/AddImageModal";

export const Profile = () =>{
    const profile = useSelector(state => state.AuthResponse.user);

    const [showModal, setShowModal] = useState(false);


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
                <div>
                    <div>
                        <h2>{profile.username}</h2>
                        <button className="">Edit Profile</button>
                    </div>
                    <div>
                        <button className="">0 posts</button>
                        <button className="">{profile.followers.length} followers</button>
                        <button className="">{profile.following.length} following</button>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="profile-item">

            </div>
        </div>
    )
}