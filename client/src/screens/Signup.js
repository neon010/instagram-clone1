import { useState } from "react";
import {IoLogoFacebook} from "react-icons/io";

export const Signup = () => {
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUserName] = useState("");

    const fetchData = async (url = '', data = {}) => {
        const res = await fetch(url, {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        return res.json();
    }


    const handleSignup = async (event) => {
        event.preventDefault();
        
        console.log(text);
        console.log(password);
        console.log(fullName);
        console.log(username);

        const data = {text, fullName, username, password}
        const res = await fetchData("/signup", data);
        console.log(res);
    }

    return (
        <main className="signup-main">
            <section className="upper-section">
                <div className="title-container">
                    <h1>Instagram</h1>
                </div>
                <div className="signp-agree">
                    <h2>Sign up to see photos and videos from your friends.</h2>
                </div>
                <div className="facebook-signup">
                    <button type="submit">
                        <span><IoLogoFacebook size={30} color="#fff"/></span>
                        <span style={{marginLeft:"10px"}}>Log in with facebook</span>
                    </button>
                </div>
                <div className="or-div">
                    <div className="left"></div>
                    <div>OR</div>
                    <div className="right"></div>
                </div>
                <div>
                    <form className="signup-form" onSubmit={handleSignup}>
                        <div>
                            <label>
                                <input 
                                type="text" 
                                value={text}
                                required 
                                placeholder="phone number or email"
                                onChange={(event)=> setText(event.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input 
                                type="text" 
                                value={fullName}
                                required 
                                placeholder="Full Name"
                                onChange = {(event) => setFullName(event.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input 
                                type="text" 
                                value={username}
                                required 
                                placeholder="Username"
                                onChange={(event) => setUserName(event.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input 
                                type="password" 
                                value={password}
                                required 
                                placeholder="password"
                                onChange={(event) => setPassword(event.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <button type="submit">Sign up</button>
                        </div>
                    </form>
                </div>
                <div className="agreements">
                    <h2>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</h2>
                </div>
            </section>
            <section className="lower-section">
                <div>
                    <span style={{color: "#262626", fontSize:"14px"}}>have an accounts?</span>
                    <a href="/login">Log in</a>
                </div>
            </section>
        </main>
    )
}