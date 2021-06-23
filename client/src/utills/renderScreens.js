import {BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";


import {Home} from "../screens/Home";
import {Login} from "../screens/Login";
import {Signup} from "../screens/Signup";
import {Profile} from "../screens/Profile";


export const renderScreens = (isLogin) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {isLogin ?  <Home/>: <Login/>}
                </Route>
                <Route exact path="/login">
                    {isLogin ? <Redirect to="/" /> : <Login/>}
                </Route>
                <Route exact path="/signup">
                    {isLogin ? <Redirect to="/"/>:<Signup/>}
                </Route>
                <Route exact path="/:username">
                    {isLogin ? <Profile/>:<Redirect to="/login"/>}
                </Route>
            </Switch>
        </Router>
    )
}