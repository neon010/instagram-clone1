import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {FcLike} from "react-icons/fc";
import {BsHeart} from "react-icons/bs";
import {FaRegComment} from "react-icons/fa";
import {FaTelegramPlane} from "react-icons/fa";
import {BiSave} from "react-icons/bi";
import {useSelector, useDispatch} from "react-redux"
import {RenderCarousel} from "../RenderCarousel"
import {timeDifference} from "../../utills/timeDifference";
import {fetchLikeUnlike} from "../../stateManager";
import {addCommentAction} from "../../stateManager";


export const PostModal = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState([]);
    const {userDetails} = useSelector(state => state.AuthResponse);
    const {user} = userDetails
    const userId = user._id
    const loginUserUsername = user.username
    
    const posts = useSelector(state => state.PostsResponse.posts);
    const [isLiked, setIsLiked] = useState();


    const postId = posts.filter(post => {
        if(post._id === id) return post;
    });
    const dispatch = useDispatch();

    const handleLikeUnlike =  () => {
        console.log('like button clicked');
        setIsLiked(!isLiked);
        const data = {userId: userId, isLiked: !isLiked, postID: post._id};
        dispatch(fetchLikeUnlike(data));
    }

    const handleComment = () => {
        console.log(comment);
        const data = {userId: userId, comment, postID: post._id}
        dispatch(addCommentAction(data))
    }

    useEffect(() => {
        setPost(postId[0]);
        if(post){
            setIsLiked(post.likes.includes(userId))
        }
    }, [post, handleLikeUnlike, postId, userId]);


    return (
        (post && (<div className="post-modal">
            <div style={{width: '400px', height:'600px !important'}}>
                <RenderCarousel photos={post.photos} videos={post.videos}/>
            </div>
            <div className="modal-left">
                <div>
                    <Link style={{display:"flex", alignItems: 'center'}}
                    to={post.postedBy.username === loginUserUsername ? "/profile" : `/profile/${post.postedBy.username}`}>
                        <img src={post.postedBy.profilePic} alt="profil-pic" width="40" height="40" style={{objectFit:"cover", borderRadius:"50%"}}/>
                        <span style={{marginLeft:"10px"}}>{post.postedBy.fullName}</span>
                    </Link>
                </div>
                <div className="comments-container">
                    <ul style={{listStyle:"none"}}>
                        {
                            post.comments && post.comments.map(comment => 
                                <li style={{display: 'flex', alignItems: 'center'}}>
                                    <span style={{marginRight:"10px"}}>
                                        <img src={comment.postedBy.profilePic} alt="profilePic" width="30" height="30" style={{borderRadius:"50%"}}/>
                                    </span>
                                    <span style={{marginRight:"10px"}}>{comment.text}</span>
                                    <span>{timeDifference(new Date(), new Date(comment.date))}</span>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="icons-container">
                    <div >
                        <button type="button" onClick={handleLikeUnlike}>
                            <BsHeart size={25} style={{display:isLiked ? "none" : "block"}}/>
                            <FcLike size={30} style={{display:isLiked ? "block" : "none"}}/>
                        </button>
                        <Link to={`/post/${post._id}`}>
                            <FaRegComment size={25}/>
                        </Link>
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
                    <span>{post.likes.length} likes</span>
                    <span>{timeDifference(new Date(), new Date(post.createdAt))}</span>
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
        </div>))
    )
}