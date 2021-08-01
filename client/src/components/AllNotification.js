import {useSelector, useDispatch} from "react-redux";
import {timeDifference} from "../utills/timeDifference"
import {fetchNotificationsOpen} from "../stateManager";
import {fetchDeleteAllNotification} from "../stateManager"
import {useHistory} from "react-router-dom";
import {Helmet} from "react-helmet";


export const AllNotification = () =>{

    const allNotifications = useSelector(state => state.NotificationResponse.notifications);
    console.log(allNotifications);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleIsOpen = (event) => {
        dispatch(fetchNotificationsOpen(event.currentTarget.dataset.notificationid));
        history.push(`/post/${event.currentTarget.dataset.entityid}`)
    }

    const handleDeleteAllNotifications = (event) => {
        console.log("deleteAllNotifications");
        dispatch(fetchDeleteAllNotification());
    }

    return (
        <div style={{marginTop:"20px", backgroundColor:"#fff", minWidth: '450px', minHeight: '500px', border:"1px solid #dbdbdb"}}>
            <Helmet>
                <title>Notifications</title>
            </Helmet>
            <div style={{marginTop:"10px", marginLeft:"10px", fontSize:"22px", fontWeight:"bold", display: 'flex', justifyContent: 'space-between'}}>
                <p>Notifications</p>
                <button style={{border:"none", backgroundColor:"transparent"}} onClick={handleDeleteAllNotifications}>Clear All</button>
            </div>
            <div style={{marginTop:"10px"}}>
            {allNotifications.length > 0 ? allNotifications.map((notification => 
                 <button
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
            )): <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize:"16px"}}>Nothing to see here — yet</div>}
            </div>
        </div>
    )
}