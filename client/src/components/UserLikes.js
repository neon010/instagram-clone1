export const UserLikes = ({post}) => {
    return (
        <div className="" style={{display: "grid", gridTemplateColumns:"1fr 1fr 1fr", gridGap:"20px", marginTop:"10px"}}>
            {post.map(item => 
            <div key={Math.random()*100000}>
                <img src={item.photos[0]} width="200" height="200"/>
            </div>
            )}
        </div>
    )
}