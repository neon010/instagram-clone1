import {OverlayTrigger, Popover} from "react-bootstrap";
import {CgProfile} from "react-icons/cg"
import {AiOutlineSetting} from "react-icons/ai";
import {VscSave} from "react-icons/vsc";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom"

export const ProfilePopover = () => {
  const AuthResponse = useSelector(state => state.AuthResponse);

  // console.log(AuthResponse);

  const {userDetails} = AuthResponse;
  const {user} = userDetails

  const handleLogout = async () => {
    console.log("handle click");
    try{
      await fetch("/logout");
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  return (
        <div>
            <OverlayTrigger
              trigger="click"
              key={'bottom'}
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  <div className="link-container" style={{display: 'flex', flexDirection: 'column'}}>
                    <Link to="/profile">
                      <CgProfile size={20} color="#262626"/>
                      <span>Profile</span>
                    </Link>
                    <Link to="/savedPost">
                      <VscSave size={20} color="#262626"/>
                      <span>Saved</span>
                    </Link>
                    <Link to="/accounts/settings">
                      <AiOutlineSetting size={20} color="#262626"/>
                      <span>Settings</span>
                    </Link>
                    <button onClick={handleLogout}>
                      <span>logout</span>
                    </button>
                  </div>
                </Popover>
              }
            >
              <button>
                <img src={user.profilePic} alt="profile user" width="30" height="30" style={{borderRadius:"50%"}}/>
              </button>
            </OverlayTrigger>
        </div>
  )
}

