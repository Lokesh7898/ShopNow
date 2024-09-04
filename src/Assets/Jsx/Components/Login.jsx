import React, { Component } from 'react';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currrState: "Login",
        };
    }

    toggleState = () => {
        this.setState({
            currrState: this.state.currrState === "Login" ? "Sign Up" : "Login",
        });
    };

    render() {
        const { currrState } = this.state;
        const { setShowLogin } = this.props;

        return (
            <div className='login-popup' id='loginPage'>
                <form className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currrState}</h2>
                            
                            <i class="fas fa-times" onClick={() => setShowLogin(false)} ></i>

                    </div>
                    <div className="login-popup-inputs">
                        {currrState === "Login" ? null : (
                            <input type="text" placeholder='Your name' required />
                        )}
                        <input type="email" placeholder='Your email' required />
                        <input type="password" placeholder='Password' required />
                    </div>
                    <button>
                        {currrState === "Sign Up" ? "Create Account" : "Login"}
                    </button>
                    <div className='login-popup-condition'>
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                    {currrState === "Login" ? (
                        <p>
                            Create a new account?{" "}
                            <span onClick={this.toggleState}>Click here</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <span onClick={this.toggleState}>Login here</span>
                        </p>
                    )}
                </form>
            </div>
        );
    }
}

export default LoginPage;
