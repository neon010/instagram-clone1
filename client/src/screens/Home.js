import {useSelector, useDispatch} from "react-redux";
import { Navbar } from "../components/Navbar";
import {Profile} from "../components/Profile";
import {Message} from "../components/Message";
import {useLocation, Redirect} from "react-router-dom"
import { Posts } from "../components/Posts";
import {AddPost} from "../components/AddPost";




export const Home = () => {
    const location = useLocation();
    console.log(location.pathname);

    function renderComponent(location){
        switch(location){
            case "/":
                return <Posts/>
            case "/add-post":
                return <AddPost/>
            case "/:username":
                return <Profile/>
            case "/direct/messages":
                return <Message/>
            default:
                return <h1>Page not found</h1>;
        }
    
    }

    return (
        <main>
            <Navbar/>
            <section style={{backgroundColor: "#FAFAFA", height: '100vh'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {renderComponent(location.pathname)}
                </div>
            </section>
        </main>
    )
}