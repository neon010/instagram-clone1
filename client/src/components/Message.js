import {RiChatNewLine} from "react-icons/ri";
import {Link} from "react-router-dom"

export const Message = () =>{
    return (
        <div className="message-container">
            <div className="left-container">
                <div style={{display: 'flex', borderBottom: '1px solid #dbdbdb'}}>
                    <h5>Mohan</h5>
                    <button className=""><RiChatNewLine/></button>
                </div>
                <ul className="contact-list">
                    <Link to="/direct/messages/:id"><li>contact 1</li></Link>
                    <Link to="/direct/messages/:id"><li>contact 1</li></Link>
                    <Link to="/direct/messages/:id"><li>contact 1</li></Link>
                    <Link to="/direct/messages/:id"><li>contact 1</li></Link>
                </ul>
            </div>
            <div className="right-container">

            </div>
        </div>
    )
}