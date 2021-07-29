import {Link} from 'react-router-dom';

export const UserPost = ({post}) => {
    console.log(post);
    return (
        <div className="" style={{display: "grid", gridTemplateColumns:"1fr 1fr 1fr", gridGap:"20px", marginTop:"10px"}}>
            {post && post.map(item => 
            <div key={Math.random()*100000}>
                <Link to={`/post/${item._id}`}>
                    <img src={item.photos[0]} width="200" height="200" alt="post" style={{objectFit: 'cover'}}/>
                </Link>
            </div>
            )}
        </div>
    )
}