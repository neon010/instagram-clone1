import { Popover } from 'react-tiny-popover'
import {CgProfile} from "react-icons/cg"
import {AiOutlineSetting} from "react-icons/ai";
import {VscSave} from "react-icons/vsc";
import {useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {useState, useEffect} from "react";

export const ProfilePopover = () => {
  const AuthResponse = useSelector(state => state.AuthResponse);
  const [showProfilePopover, setShowProfilePopover] = useState(false);



  const {userDetails} = AuthResponse;
  const {user} = userDetails

  const history = useHistory();

  const handleLogout = async () => {
    console.log("handle click");
    try{
      await fetch("/logout");
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    return history.listen((location, action) => {
        setShowProfilePopover(false);
  })
   },[history, setShowProfilePopover]) 




  return (
        <div >
            <Popover
              isOpen={showProfilePopover}
              onClickOutside={() => setShowProfilePopover(false)}
              positions={['bottom']}
              padding={5}
              content={ <div id={`popover-positioned-bottom`}>
                  <div className="link-container" style={{display: 'flex', flexDirection: 'column'}} >
                  <Link to="/profile">
                    <CgProfile size={20} color="#262626"/>
                    <span>Profile</span>
                  </Link>
                  <Link to="/profile/saved">
                    <VscSave size={20} color="#262626"/>
                    <span>Saved</span>
                  </Link>
                  <Link to="/accounts/edit">
                    <AiOutlineSetting size={20} color="#262626"/>
                    <span>Settings</span>
                  </Link>
                  <button onClick={handleLogout}>
                    <span>logout</span>
                  </button>
                </div>
              </div>
            }
            >
              <button onClick={() => setShowProfilePopover(!showProfilePopover)}>
                <img src={user && user.profilePic} alt="profile user" width="30" height="30" style={{borderRadius:"50%"}}/>
              </button>
            </Popover>
        </div>
  )
}

