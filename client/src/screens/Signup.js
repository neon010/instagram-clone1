import {IoLogoFacebook} from "react-icons/io";

export const Signup = () => {
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
                    <form className="signup-form">
                        <div>
                            <label>
                                <input type="text" required placeholder="phone number or email"/>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="text" required placeholder="Full Name"/>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="text" required placeholder="Username"/>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="password" required placeholder="phone number, username or email"/>
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