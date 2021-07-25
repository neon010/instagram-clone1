import {OverlayTrigger, Popover} from "react-bootstrap";
import {BsBell} from "react-icons/bs";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom"
import {timeDifference} from "../../utills/timeDifference"
import {fetchNotificationsOpen} from "../../stateManager";
import {Link} from "react-router-dom";

export const Notification = () => {
  const notifications = useSelector(state => state.NotificationResponse.notifications);

  const dispatch = useDispatch();
  const history = useHistory();


  const handleIsOpen = (event) => {
    dispatch(fetchNotificationsOpen(event.currentTarget.dataset.notificationid));
    history.push(`/post/${event.currentTarget.dataset.entityid}`)
  }


  return (
        <div>
            <OverlayTrigger
              trigger="click"
              key={'bottom'}
              // show={false}
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-bottom`}>
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
                          backgroundColor: notification.opened ? '#fff' : '#DBDBDB'
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
                </Popover>
              }
            >
              <button>
                <BsBell size={28}/>
              </button>
            </OverlayTrigger>
        </div>
  )
}