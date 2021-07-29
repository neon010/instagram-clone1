import {useSelector} from "react-redux";
import {useState, useEffect} from "react"

export const ChangePassword = () =>{
    const {userDetails} = useSelector(state => state.AuthResponse);
    const [data, setData] = useState({})
    const [enableBtn, setEnableBtn] = useState(true);

    const {user} = userDetails
    console.log(user)

    const handleChange = (event) => {
        const newData = { ...data};
        newData[event.target.name] = event.target.value;
        setData(newData);
    }

    useEffect(() => {
        console.log(data.newPassword, data.confirmPassword)
        if(data.newPassword && data.confirmPassword){
            setEnableBtn(!(data.newPassword === data.confirmPassword));
        }
    },[data])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(data)
        const response = await fetch("/change-password", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        console.log(result)
        alert(result.message);
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
                </div>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="label-container">
                        <label>Old Password</label>
                    </div>
                    <div className="input-container">
                        <input 
                        type="password" 
                        name="oldPassword"
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="label-container">
                        <label>New Password</label>
                    </div>
                    <div className="input-container">
                        <input 
                        type="password" 
                        name = "newPassword"
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="label-container">
                        <label>Confirm Password</label>
                    </div>
                    <div className="input-container">
                        <input 
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div  className="form-group">
                    <div className="label-container">
                    </div>
                    <div className="input-container">
                        <button disabled={enableBtn}>Change Password</button>
                    </div>
                </div>
            </form>
        </div>
    )
}