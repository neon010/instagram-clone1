import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {updateUserProfile} from "../stateManager"
import { AddImageModal } from "./ModalsAndPopover/AddImageModal";

export const EditProfile = () =>{
    const {userDetails} = useSelector(state => state.AuthResponse);
    const [profileData, setProfileData] = useState({});
    const [showModal, setShowModal] = useState(false);


    const {user} = userDetails
    console.log(user)
    const dispatch = useDispatch();

    const handleClose = () => {
        setShowModal(false)
    }

    const handleChange = (event) => {
        const newProfileData = { ...profileData };
        newProfileData[event.target.name] = event.target.value;
        setProfileData(newProfileData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(updateUserProfile(profileData));
    }
    return (
        <div className="edit-profile">
            <div className="top-profile-container">
                <div className="image-container">
                    <div className="image-profile-div">
                        <img src={user.profilePic} alt="profile" width="35" height="35" style={{borderRadius:"50%"}} className="profile-image"/>
                    </div>
                </div>
                <div className="user-details">
                    <h1 style={{margin:0, padding:0}}>{user.username}</h1>
                    <button 
                    className="change-photo-btn"
                    onClick={() => setShowModal(true)}
                    >Change profile photo
                    </button>
                </div>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="label-container">
                        <label>Name</label>
                    </div>
                    <div className="input-container">
                        <input 
                        type="text" 
                        name="fullName" 
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="label-container">
                        <label>Username</label>
                    </div>
                    <div className="input-container">
                        <input 
                        type="text"  
                        name="username"
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div  className="form-group">
                    <div  className="label-container">
                        <label>Website</label>
                    </div>
                    <div className="input-container">
                        <input 
                        type="text"  
                        placeholder="Website" 
                        name="website" 
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div  className="form-group">
                    <div  className="label-container">
                        <label>Bio</label>
                    </div>
                    <div  className="input-container">
                        <textarea 
                        type="text" 
                        placeholder="Bio"
                        name="bio"
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div  className="label-container">
                        <label>Email</label>
                    </div>
                    <div  className="input-container">
                        <input 
                        type="email"  
                        name="email"
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div  className="form-group">
                    <div className="label-container">
                        <label>Phone Number</label>
                    </div>
                    <div  className="input-container">
                        <input 
                        type="text" 
                        name="phone"
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div  className="form-group">
                    <div className="label-container">
                    </div>
                    <div className="input-container">
                        <button disabled={Object.keys(profileData).length > 0 ? false:true}>Submit</button>
                    </div>
                </div>
            </form>
            <AddImageModal showModal={showModal} setShowModal={setShowModal} handleClose={handleClose}/>
        </div>
    )
}