import {useSelector, useDispatch} from "react-redux";
import { Navbar } from "../components/Navbar";
import {Profile} from "../components/Profile";
import {Message} from "../components/Message";
import {useLocation, Redirect, useRouteMatch} from "react-router-dom"
import { Posts } from "../components/Posts";
import {AddPost} from "../components/AddPost";
import {UserProfile} from "../components/UserProfile";




export const Home = () => {
    const location = useLocation();

    let { path, url } = useRouteMatch();

    console.log(path, url);

    function renderComponent(path, url){
        switch(path){
            case "/" :
                return <Posts/>
            case "/add-post" :
                return <AddPost/>
            case "/profile":
                return <Profile/>
            case `/profile/:id` :
                return <UserProfile/>
            case "/direct/messages":
                return <Message/>
            default:
                return <h1>Page not found</h1>;
        }
    
    }

    return (
        <main>
            <Navbar/>
            <section style={{backgroundColor: "#FAFAFA", minHeight: '100vh'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {renderComponent(path)}
                </div>
            </section>
        </main>
    )
}