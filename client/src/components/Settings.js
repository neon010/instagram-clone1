import {NavLink,useRouteMatch} from "react-router-dom";
import {EditProfile} from "./EditProfile";
import {ChangePassword} from "./ChangePassword";
import {Helmet} from "react-helmet"

export const Settings = () =>{

    let { path} = useRouteMatch();

    function render(path) {
        switch(path){
            case `/accounts/edit/`:
                return <EditProfile/>
            case `/accounts/edit/change-password`:
                return <ChangePassword/>
            default: return <EditProfile/>;
        }
    }
    return (
        <div className="settings">
            <Helmet>
                <title>Edit Profile</title>
            </Helmet>
            <div className="left-container">
                <NavLink to={`/accounts/edit/`}>Edit Profile</NavLink>
                <NavLink to={`/accounts/edit/change-password`}>Change Password</NavLink>
            </div>
            <div className="vertical-line"></div>
            <div className="right-container">{render(path)}</div>
        </div>
    )
}