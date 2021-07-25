import {FETCH_NOTIFICATION_REQUEST, 
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_ERROR, 
    FETCH_NOTIFICATION_OPEN, 
    FETCH_LATEST_NOTIFICATION_SUCCESS} 
    from "./actionTypes";

const fetchNotificationsRequest = () =>{
    return{
        type: FETCH_NOTIFICATION_REQUEST
    }
}

const fetchNotificationsSuccess = (notifications) =>{
    return {
        type: FETCH_NOTIFICATION_SUCCESS,
        payload: notifications
    }
}

const fetchNotificationsError = (error) =>{
    return {
        type: FETCH_NOTIFICATION_ERROR,
        payload: error
    }
}

export const fetchNotifications = () =>{
    return async function(dispatch){
        try {
            fetchNotificationsRequest();
            const res = await fetch('/get-notification');
            const json = await res.json();

            if(json.error) throw json.error;

            dispatch(fetchNotificationsSuccess(json.data));
        } catch (error) {
            dispatch(fetchNotificationsError(error));
        }
    }
}

const fetchNotificationsOpenSuccess = (notification) =>{
    return {
        type: FETCH_NOTIFICATION_OPEN,
        payload: notification
    }
}

export const fetchNotificationsOpen = (id) =>{
    return async function(dispatch){
        try {
            fetchNotificationsRequest();
            const res = await fetch(`/notification/${id}/markAsOpened`, {
                method: 'PUT',
                headers:{
                  "Content-Type":"application/json"
              },
            });
            const json = await res.json();

            if(json.error) throw json.error;

            dispatch(fetchNotificationsOpenSuccess(json.data));
        } catch (error) {
            dispatch(fetchNotificationsError(error));
        }
    }
}

const fetchLatestNotificationSuccess = (notification) => {
    return {
        type: FETCH_LATEST_NOTIFICATION_SUCCESS,
        payload: notification
    }
}

export const fetchLatestNotification = () =>{
    return async function(dispatch){
        try {
            fetchNotificationsRequest();
            const res = await fetch(`/notification/latest`);
            const json = await res.json();
            console.log(json)
            if(json.error) throw json.error;

            dispatch(fetchLatestNotificationSuccess(json.data));
        } catch (error) {
            dispatch(fetchNotificationsError(error));
        }
    }
}