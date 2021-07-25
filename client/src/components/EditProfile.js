import {useSelector} from "react-redux";

export const EditProfile = () =>{
    const {userDetails} = useSelector(state => state.AuthResponse);

    const {user} = userDetails
    console.log(user)
    return (
        <div>
            <div style={{marginTop: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{marginRight: "20px"}}>
                        <img src={user.profilePic} alt="profile" width="40" height="40" style={{borderRadius:"50%"}}/>
                    </div>
                    <div style={{marginLeft: "10px"}}>
                        <h1 style={{margin:0}}>{user.username}</h1>
                        <button style={{border:"none", backgroundColor:"transparent", color:"#0095f6", fontWeight:"bold"}}>Change Profile photo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}