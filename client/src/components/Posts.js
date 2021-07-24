import {useEffect} from "react";
import {PostsItem} from "./PostsItem";
import {useSelector, useDispatch} from "react-redux";
import {fetchPosts} from "../stateManager"


export const Posts = () =>{
    const dispatch = useDispatch();


    useEffect(() =>{
        dispatch(fetchPosts());

    }, [dispatch])

    const posts = useSelector(state => state.PostsResponse.posts)

    return (
        <div className="post-container">
            {!posts ? <h2>Loading...</h2> : 
            posts.map(item => <PostsItem item={item} key={Math.random()*10000000000}/>)
            }
        </div>
    )
}