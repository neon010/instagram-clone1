import {useState} from "react";
import  {useSelector} from "react-redux";
import { AddImageModal } from "./ModalsAndPopover/AddImageModal";
import {useRouteMatch,NavLink} from "react-router-dom";
import {UserPost} from "../components/UserPost";
import {BiGrid} from "react-icons/bi";
import {BsHeart} from "react-icons/bs";
import {BiSave} from "react-icons/bi";

export const Profile = () =>{
    const {userDetails} = useSelector(state => state.AuthResponse);


    const profile = userDetails.user

    const userPost = userDetails.userPost
    const likedPost = userDetails.likedPost
    console.log(userPost);

    let { path } = useRouteMatch();

    const [showModal, setShowModal] = useState(false);



    function render(path) {
        switch(path){
            case `/profile/`:
                return <UserPost post={userPost}/>
            case `/profile/likes`:
                return <UserPost post={likedPost}/>
            case `/profile/saved`:
                return <UserPost post={[]}/>
            default: return <UserPost post={userPost}/>;
        }
    }

    const handleClose = () => setShowModal(false);

    console.log(profile);

    return (
        <div className="profile-container" id="profile-container">
            <div className="profile-info">
                <div className="profile-image">
                    <img 
                    src={profile.profilePic} 
                    alt="profile" 
                    onClick={()=> setShowModal(true)}
                    style={{objectFit:"cover"}}
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
                            <span style={{fontWeight:"bold", marginRight:"5px"}}>{userPost.length}</span>
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
                <div className="link-container">
                        <NavLink to={`/profile/`}><BiGrid size={25}/> Post</NavLink>
                        <NavLink to={`/profile/likes`}><BsHeart size={25}/> Likes</NavLink>
                        <NavLink to={`/profile/saved`}><BiSave size={25}/> saved</NavLink>
                    </div>
                    <div>
                        { render(path)}
                    </div>
            </div>
        </div>
    )
}