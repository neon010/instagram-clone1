import {OverlayTrigger, Popover} from "react-bootstrap";
import Avatar from 'react-avatar';
import {CgProfile} from "react-icons/cg"
import {AiOutlineSetting} from "react-icons/ai";
import {VscSave} from "react-icons/vsc";
import {useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom"

export const ProfilePopover = () => {
  const history = useHistory();
  const AuthResponse = useSelector(state => state.AuthResponse);
  const {user} = AuthResponse;

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
                    <Link to="/:username">
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
              <button><Avatar name={user.fullName} size={33} round={true}/></button>
            </OverlayTrigger>
        </div>
  )
}

