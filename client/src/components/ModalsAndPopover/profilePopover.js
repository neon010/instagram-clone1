import {OverlayTrigger, Popover} from "react-bootstrap";
import {CgProfile} from "react-icons/cg"
import {AiOutlineSetting} from "react-icons/ai";
import {VscSave} from "react-icons/vsc";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useState, useEffect, useRef} from "react"

export const ProfilePopover = () => {
  const AuthResponse = useSelector(state => state.AuthResponse);
  const [showProfilePopover, setShowProfilePopover] = useState(false);

  const myElem = useRef(null);

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

//   useEffect(() => {
//     function handleClickOutside(event) {
//         if (myElem.current && !myElem.current.contains(event.target)) {
//           setShowProfilePopover(false);
//         }
//     }
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//         // Unbind the event listener on clean up
//         document.removeEventListener("mousedown", handleClickOutside);
//     };
// }, [myElem]);

  return (
        <div ref={myElem}>
            <OverlayTrigger
              trigger="click"
              key={'bottom'}
              placement={'bottom'}
              show={showProfilePopover}
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
                    <Link to="/accounts/edit">
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
              <button onClick={() => setShowProfilePopover(!showProfilePopover)}>
                <img src={user.profilePic} alt="profile user" width="30" height="30" style={{borderRadius:"50%"}}/>
              </button>
            </OverlayTrigger>
        </div>
  )
}

