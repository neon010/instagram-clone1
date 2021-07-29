import {IoLogoFacebook} from "react-icons/io";
import { useState} from "react";
import {useDispatch} from "react-redux";
import {fetchLoginUser} from "../stateManager"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Login = () => {
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const fetchData = async (url = '', data = {}, type = '') => {
        const res = await fetch(url, {
            method: type,
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        return res.json();
    }

    const  handleLocalLogin = async (event) => {
        event.preventDefault();
        const data = {text, password}
        try {
            await fetchData("/login", data, "POST");
            dispatch(fetchLoginUser());
        }catch (err) {
            setError(err.message)
            toast(err.message);
        }
    } 

    const handleFacebookLogin = async (event) => {
        event.preventDefault();
        const res = await fetch("/facebook");
        console.log(res);
    }
    console.log(error);
    return (
        <main className="login-main">
            <section className="upper-section">
                <div className="title-container">
                    <h1>Instagram</h1>
                </div>
                <div>
                    <form className="login-form" onSubmit={handleLocalLogin}>
                        <div className="form-group">
                            <label>
                                <input type="text" 
                                name="text" 
                                required 
                                placeholder="phone number, username or email"
                                value={text} 
                                onChange = {(event) => setText(event.target.value)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input 
                                type="password" 
                                required 
                                placeholder="password"
                                value={password} 
                                onChange = {(event) => setPassword(event.target.value)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <button type="submit">Log in</button>
                        </div>
                    </form>
                </div>
                <div className="or-div">
                    <div className="left"></div>
                    <div>OR</div>
                    <div className="right"></div>
                </div>
                <div className="facebook-login">
                    <button type="submit" onClick={handleFacebookLogin}>
                        <span><IoLogoFacebook size={30} color="385185"/></span>
                        <span style={{marginLeft:"10px"}}>Log in with facebook</span>
                    </button>
                </div>
                <div className="forget-password">
                    <a href="/forget-password" className="forget-password-link">Forget Password?</a>
                </div>
            </section>
            <section className="lower-section">
                <div>
                    <span style={{color: "#262626", fontSize:"14px"}}>Dont have an accounts?</span>
                    <a href="/signup">Sign up</a>
                </div>
            </section>
            <ToastContainer autoClose={3000} />
        </main>
    )
}