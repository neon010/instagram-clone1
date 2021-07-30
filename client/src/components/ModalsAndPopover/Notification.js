import {Popover} from 'react-tiny-popover';
import {BsBell} from "react-icons/bs";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom"
import {timeDifference} from "../../utills/timeDifference"
import {fetchNotificationsOpen} from "../../stateManager";
import {Link} from "react-router-dom";
import {useRef, useEffect, useState} from "react"

export const Notification = () => {
  const [showPopover, setShowPopover] = useState(false);
  const notifications = useSelector(state => state.NotificationResponse.notifications);

  const dispatch = useDispatch();
  const history = useHistory();

  const myElem = useRef(null);

  const handleIsOpen = (event) => {
    dispatch(fetchNotificationsOpen(event.currentTarget.dataset.notificationid));
    history.push(`/post/${event.currentTarget.dataset.entityid}`)
  }


  useEffect(() => {
    return history.listen((location, action) => {
        console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
        console.log(`The last navigation action was ${action}`)
        setShowPopover(false);
  })
   },[history, setShowPopover]) 



  return (
        <div ref={myElem}>
            <Popover
              isOpen={showPopover}
              onClickOutside={() => setShowPopover(false)}
              positions={['bottom']} // preferred positions by priority
              padding={5}
              content={ 
              <div id={`popover-positioned-bottom`}>
                  <div style={{margin:"5px  0 "}}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop:"10px", marginBottom:"5px", fontSize:"20px", fontWeight:"bold"}}>Notification</div>
                    <div>
                      {notifications && (notifications.length > 0 ? notifications.map((notification, index)=> {
                        if(index < 3){
                          return <button
                          key={notification._id}
                          onClick={handleIsOpen} 
                          data-notificationid={notification._id} 
                          data-entityid = {notification.entityId}
                          style={{
                          border:"none",
                          display: 'flex', 
                          alignItems: 'center', 
                          textDecoration: 'none', 
                          marginBottom:"5px", 
                          color: '#000', 
                          padding:"6px",
                          width: "100%",
                          backgroundColor: notification.opened ? '#fff' : '#DBDBDB',
                          cursor:"pointer"
                          }}>
                            <span>
                              <img src={notification.userFrom.profilePic} alt="profile user" width="40" height="40" style={{borderRadius:"50%"}}/>
                            </span> 
                            <span style={{marginLeft:"5px"}}>{notification.userFrom.fullName}</span>
                            <span style={{marginLeft:"5px"}}>{notification.notificationType === "postLike" ? "like your one of the post": notification.notificationType === "postComment" ? "commented on one of the post" : ""}</span>
                            <span style={{marginLeft:"5px", color:"#ADADAD", fontSize:"12px"}}>{timeDifference(new Date(), new Date(notification.createdAt))}</span>
                          </button>
                        }else if(index > 3){
                          return;
                        }
                      }
                      ):<div style={{display: 'flex', marginBottom:"10px", marginTop:"10px"}}>Nothing to see here — yet</div>)}
                      <Link to="/all-notifications" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px'}}>See all notifications</Link>
                    </div>
                  </div>
              </div>
            }
            >
              <button onClick={() => setShowPopover(!showPopover)}>
                <BsBell size={28}/>
              </button>
            </Popover>
        </div>
  )
}