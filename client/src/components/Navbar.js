import {NavLink} from "react-router-dom";
import {AiFillHome} from "react-icons/ai";
import {RiTelegramLine} from "react-icons/ri";
import {BsPlusCircleFill} from "react-icons/bs";
import {useSelector} from "react-redux";


import { ProfilePopover } from "./ModalsAndPopover/profilePopover";

export const  Navbar = () => {
    const AuthResponse = useSelector(state => state.AuthResponse);
    const {user} = AuthResponse;

    return (
    <nav className="navbar">
        <div className="home-container">
            <NavLink to="/">Instagram</NavLink>
        </div>
        <div className="search-container">
            <input type="text" placeholder="&#xF002; Search" style={{fontFamily:'Arial, FontAwesome'}}/>
        </div>
        <div className="right-link-container">
            <NavLink to="/" ><AiFillHome size={28}/></NavLink>
            <NavLink to="/add-post"><BsPlusCircleFill size={28}/></NavLink>
            <NavLink to="/direct/messages"><RiTelegramLine size={33}/></NavLink>
            <ProfilePopover/>
        </div>
    </nav>
    )
}