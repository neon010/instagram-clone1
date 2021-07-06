import {useState,useEffect} from "react";
import {BsThreeDots} from "react-icons/bs";
import {FcLike} from "react-icons/fc";
import {BsHeart} from "react-icons/bs";
import {FaRegComment} from "react-icons/fa";
import {FaTelegramPlane} from "react-icons/fa";
import {BiSave} from "react-icons/bi";
import {Link} from "react-router-dom";
import {RenderCarousel} from "./RenderCarousel";
import {timeDifference} from "../utills/timeDifference";

import {useSelector, useDispatch} from "react-redux";
import {fetchLikeUnlike} from "../stateManager";
import {addCommentAction} from "../stateManager";



export const PostsItem = ({item}) =>{
    const {userDetails} = useSelector(state => state.AuthResponse);
    const {user} = userDetails
    const userId = user._id
    const loginUserUsername = user.username


    const dispatch = useDispatch();

    const [isLiked, setIsLiked] = useState(item.likes.includes(userId));
    const [comment,  setComment] = useState("");



    const timeStamp = timeDifference(new Date(), new Date(item.createdAt));

    const handleLikeUnlike = () => {
        setIsLiked(!isLiked);
        const data = {userId: userId, isLiked: !isLiked, postID: item._id}
        dispatch(fetchLikeUnlike(data));
    }

    const handleComment = () => {
        console.log(comment);
        const data = {userId: userId, comment, postID: item._id}
        dispatch(addCommentAction(data))
    }

    return (
        (item.photos.length > 0 || item.videos.length > 0) ? (
            <div className="post-item" key={item._id}>
                <div className="top-link-profile" style={{display:"flex", justifyContent:"space-between"}}>
                    <Link style={{display:"flex", alignItems: 'center'}}
                    to={item.postedBy.username === loginUserUsername ? "/profile" : `/profile/${item.postedBy.username}`}>
                        <img src={item.postedBy.profilePic} alt="profil-pic" width="40" height="40" style={{objectFit:"cover"}}/>
                        <span style={{marginLeft:"10px"}}>{item.postedBy.fullName}</span>
                    </Link>
                    <BsThreeDots size={25} style={{padding: '5px'}}/>
                </div>
                <div style={{width:"600px", height:"760px"}} >
                    <RenderCarousel photos={item.photos} videos={item.videos}/>
                </div>
                <div className="icons-container" style={{marginTop:"10px", display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <button type="button" onClick={handleLikeUnlike}>
                            <BsHeart size={25} style={{display:isLiked ? "none" : "block"}}/>
                            <FcLike size={30} style={{display:isLiked ? "block" : "none"}}/>
                        </button>
                        <button type="button">
                            <FaRegComment size={25}/>
                        </button>
                        <button type="button">
                            <FaTelegramPlane size={25}/>
                        </button>
                    </div>
                    <div>
                        <button>
                            <BiSave size={25}/>
                        </button>
                    </div>
                </div>
                <div className="likes-container">
                    <span>{item.likes.length} likes</span>
                </div>
                <div className="caption-container">
                    <span className="postedBy-fullName">{item.postedBy.fullName}</span>
                    <span className="caption">"{item.caption}"</span>
                </div>
                <div className="timestamp">{timeStamp}</div>
                <div className="post-comments">
                    <ul>
                        {item.comments.map(comment => 
                        <li>
                            <span className="">
                                <img src={comment.postedBy.profilePic} alt="profile"/>
                                <p>{comment.postedBy.fullName}</p>
                            </span>
                            <p>{comment.text}</p>
                            <span>{timeDifference(new Date(), new Date(comment.date))}</span>
                        </li>)}
                    </ul>
                </div>
                <div className="add-comments">
                    <button>😀</button>
                    <textarea 
                    type="text" 
                    placeholder="Add a comment"
                    value = {comment}
                    onChange={(event) => setComment(event.target.value)}
                    />
                    <button onClick={handleComment}>post</button>
                </div>
            </div>
        ): null
    )   
}