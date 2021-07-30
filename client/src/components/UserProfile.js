import {useState, useEffect} from "react";
import {useParams,useRouteMatch,NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {BiGrid} from "react-icons/bi";
import {BsHeart} from "react-icons/bs";
import {BsFillPersonCheckFill} from "react-icons/bs";
import {UserPost} from "../components/UserPost";
import {fetchRefreshUser} from "../stateManager";


export const UserProfile = () =>{
    const dispatch = useDispatch();
    const {id} = useParams();
    let { path} = useRouteMatch();
    const {userDetails} = useSelector(state => state.AuthResponse);
    const userId = userDetails.user._id
    console.log(userId)

    const [profile, setProfile] = useState(null);
    const [userPost, setUserPost] = useState(null);
    const [likedPost, setLikedPost] = useState(null);
    const [isFollowing, setIsFollowing] = useState(profile ? profile.followers.includes(userId) : false);
    const [error, setError] = useState("");

    const socket = useSelector(state => state.Socket);


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
                        <button>message</button>
                        <button onClick={followUser}>
                            {isFollowing ? <BsFillPersonCheckFill/> : "Follow"}
                        </button>
                    </div>
                    <div className="profile-followers">
                        <button >
                            <span style={{fontWeight:"bold", marginRight:"5px"}}>{userPost.length}</span>
                            <span style={{color:"#898989"}}>posts</span>
                        </button>
                        <button >
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
                    <NavLink to={`/profile/${profile.username}/`}><BiGrid size={25}/> Post</NavLink>
                    <NavLink to={`/profile/${profile.username}/likes`}><BsHeart size={25}/> Likes</NavLink>
                </div>
                <div>
                    { render(path)}
                </div>
            </div>
        </div>}
        </div>
    )
}