import {useState, useEffect} from "react";
import {useParams,useRouteMatch,NavLink, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {BiGrid} from "react-icons/bi";
import {BsHeart} from "react-icons/bs";
import {BsFillPersonCheckFill} from "react-icons/bs";
import {UserPost} from "../components/UserPost";
import {fetchRefreshUser} from "../stateManager";
import {fetchInbox} from "../stateManager";
import { ShowFollowerModal } from "./ModalsAndPopover/ShowFollowerModal";



export const UserProfile = () =>{
    const dispatch = useDispatch();
    const {id} = useParams();
    let { path} = useRouteMatch();
    const {userDetails} = useSelector(state => state.AuthResponse);
    const userId = userDetails.user._id
    console.log(userId)

    const [profile, setProfile] = useState([]);
    const [userPost, setUserPost] = useState(null);
    const [likedPost, setLikedPost] = useState(null);
    const [isFollowing, setIsFollowing] = useState(null);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [value, setValue] = useState(null);
    const [error, setError] = useState("");

    const socket = useSelector(state => state.Socket);

    const history = useHistory();

    // console.log(profile.followers.includes(userId))


    useEffect(()=>{
        const url = `/user-details/${id}`
        fetch(url).then(res=>res.json())
        .then(result=>{       
            console.log(result);   
            if(result.status === "success"){
                setProfile(result.data.user);
                setUserPost(result.data.userPost);
                setLikedPost(result.data.likedPost);
            }else{
                setError(result.message);
            }
        })
     },[id])

     useEffect(() => {
         if(profile && profile.followers){
            setIsFollowing(profile.followers.includes(userId))
         }
     }, [profile])



    function render(path) {
        switch(path){
            case `/profile/:id/`:
                return <UserPost post={userPost}/>
            case `/profile/:id/likes`:
                return <UserPost post={likedPost}/>
            default: return <UserPost post={userPost}/>;
        }
    }

    const followUser = () =>{
        if (isFollowing) return;
        console.log('Follow');
        fetch("/follow-user", {
            method: 'PATCH',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({userId: profile._id})
        }).then(res => res.json())
            .then(result => {
                if(result.status === "success"){
                    setProfile(result.data);
                    setIsFollowing(true);
                    dispatch(fetchRefreshUser());
                    if(socket.emit){
                        socket.emit('notification received', userId)
                    }
                }else{
                    setError(result.message);
                }
            })
    }

    const handlesendMessage = () =>{
        const data = {selectedUser: [profile]}
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
                dispatch(fetchInbox());
            }
        });
    }

    const handleShowFollowers = (event) => {
        console.log(event.currentTarget.dataset.id)
        setValue(event.currentTarget.dataset.id)
        setShowFollowerModal(true)
    }

    return (
        <div className="profile-container" id="profile-container">
            {profile && userPost && !error && <div className="profile-container" id="profile-container">
            <div className="profile-info">
                <div className="profile-image">
                    <img src={profile.profilePic} alt="profile" />
                </div>
                <div className="profile-user-info">
                    <div className="profile-username">
                        <h2>{profile.username}</h2>
                        <button onClick={handlesendMessage}>message</button>
                        <button onClick={followUser}>
                            {isFollowing ? <BsFillPersonCheckFill/> : "Follow"}
                        </button>
                    </div>
                    <div className="profile-followers">
                        <button >
                            <span style={{fontWeight:"bold", marginRight:"5px"}}>{userPost.length}</span>
                            <span style={{color:"#898989"}}>posts</span>
                        </button>
                        <button onClick={handleShowFollowers} data-id="followers">
                            <span style={{fontWeight:"bold", marginRight:"5px"}}>{profile.followers.length}</span>
                            <span style={{color:"#898989"}}>followers</span>
                        </button>
                        <button onClick={handleShowFollowers} data-id="following">
                            <span style={{fontWeight:"bold", marginRight:"5px"}}>{profile.following.length}</span>
                            <span style={{color:"#898989"}}>following</span>
                        </button>
                    </div>
                    <div className="profile-fullName">{profile.fullName}</div>
                </div>
            </div>
            <div className="profile-item">
                <div className="link-container">
                    <NavLink to={`/profile/${profile.username}/`}><BiGrid size={25}/> Post</NavLink>
                    <NavLink to={`/profile/${profile.username}/likes`}><BsHeart size={25}/> Likes</NavLink>
                </div>
                <div>
                    { render(path)}
                </div>
            </div>
        </div>}
        <ShowFollowerModal 
        showFollowerModal={showFollowerModal} 
        setShowFollowerModal={setShowFollowerModal}
        value={value}
        userId={profile && profile._id}
        />
        </div>
    )
}