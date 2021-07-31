import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {AiFillHome} from "react-icons/ai";
import {RiTelegramLine} from "react-icons/ri";
import {BsPlusCircleFill} from "react-icons/bs";

import {useSelector, useDispatch} from "react-redux";
import {fetchNotifications} from "../stateManager"


import { ProfilePopover } from "./ModalsAndPopover/profilePopover";
import {ShowUserModal} from "./ModalsAndPopover/ShowUserModal";
import {Notification} from "./ModalsAndPopover/Notification";

export const  Navbar = () => {
    const [keywords, setKeywords] = useState("")
    const [showModal, setShowModal] = useState(false);

    const socket = useSelector(state => state.Socket);


    const dispatch = useDispatch();


      useEffect(() => {
        dispatch(fetchNotifications());
      }, [dispatch]);

    const handleshowUserModal = (event) => {
        setKeywords(event.target.value)
        setShowModal(true);
    }


    return (
    <nav className="navbar">
        <div className="home-container">
            <NavLink to="/">Instagram</NavLink>
        </div>
        <div className="search-container">
            <input 
            type="text" 
            placeholder="&#xF002; Search" 
            style={{fontFamily:'Arial, FontAwesome'}}
            onChange={handleshowUserModal}
            />
        </div>
        <div className="right-link-container">
            <NavLink to="/" ><AiFillHome size={28}/></NavLink>
            <NavLink to="/add-post"><BsPlusCircleFill size={28}/></NavLink>
            <NavLink to="/direct/messages"><RiTelegramLine size={33}/></NavLink>
            <Notification />
            <ProfilePopover/>
        </div>
        <ShowUserModal showModal={showModal} setShowModal={setShowModal} keywords={keywords}/>
    </nav>
    )
}