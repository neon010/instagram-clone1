import { useState } from "react";
import {IoLogoFacebook} from "react-icons/io";

export const Login = () => {
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");

    return (
        <main className="login-main">
            <section className="upper-section">
                <div className="title-container">
                    <h1>Instagram</h1>
                </div>
                <div>
                    <form className="login-form">
                        <div className="form-group">
                            <label>
                                <input type="text" value={text} name="text" required placeholder="phone number, username or email"/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input type="password" value={password} required placeholder="phone number, username or email"/>
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
                    <button type="submit">
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
        </main>
    )
}