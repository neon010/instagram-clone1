import {BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";


import {Home} from "../screens/Home";
import {Login} from "../screens/Login";
import {Signup} from "../screens/Signup";


export const renderScreens = (isLogin, loading, error) => {
    return (
    <Router>
        <Switch>
            <Route exact path="/">
                {loading ? <h1>Loading...</h1> : isLogin ?  <Home/>: <Login/>}
            </Route>
            <Route exact path="/login">
                {loading ? <h1>Loading...</h1> : isLogin ? <Redirect to="/" /> : <Login/>}
            </Route>
            <Route exact path="/signup">
                {loading ? <h1>Loading...</h1>: isLogin ? <Redirect to="/"/>:<Signup/>}
            </Route>
            <Route exact path="/profile">
                {loading ? <h1>Loading...</h1>: isLogin ? <Home/>:<Redirect to="/login"/>}
            </Route>
            <Route exact path="/profile/:id">
                {loading ? <h1>Loading...</h1>: isLogin ? <Home/>:<Redirect to="/login"/>}
            </Route>
            <Route exact path="/profile/:id/">
                {loading ? <h1>Loading...</h1>: isLogin ? <Home/>:<Redirect to="/login"/>}
            </Route>
            <Route exact path="/profile/:id/likes">
                {loading ? <h1>Loading...</h1>: isLogin ? <Home/>:<Redirect to="/login"/>}
            </Route>
            <Route exact path="/profile/:id/saved">
                {loading ? <h1>Loading...</h1>: isLogin ? <Home/>:<Redirect to="/login"/>}
            </Route>
            <Route exact path="/add-post">
                {loading ? <h1>Loading...</h1>: isLogin ? <Home/>:<Redirect to="/login"/>}
            </Route>
            <Route exact path="/direct/messages">
                {loading ? <h1>Loading...</h1>: isLogin ? <Home/>:<Redirect to="/login"/>}
            </Route>
        </Switch>
    </Router>
    )
}