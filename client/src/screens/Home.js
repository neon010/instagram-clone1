// import {useSelector, useDispatch} from "react-redux";
import { Navbar } from "../components/Navbar";
import {Profile} from "../components/Profile";
import {Inbox} from "../components/Inbox";
import {useRouteMatch} from "react-router-dom"
import { Posts } from "../components/Posts";
import { PostModal } from "../components/ModalsAndPopover/PostModal";
import {AddPost} from "../components/AddPost";
import {UserProfile} from "../components/UserProfile";




export const Home = () => {

    let { path} = useRouteMatch();

    function renderComponent(path){
        switch(path){
            case "/" :
                return <Posts/>
            case "/post/:id" :
                return <PostModal/>
            case "/add-post" :
                return <AddPost/>
            case "/profile":
                return <Profile/>
            case `/profile/:id` :
                return <UserProfile/>
            case `/profile/:id/` :
                return <UserProfile/>
            case `/profile/:id/likes` :
                return <UserProfile/>
            case `/profile/:id/saved` :
                return <UserProfile/>
            case "/direct/messages":
                return <Inbox/>
            case "/direct/messages/:id":
                return <Inbox/>
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