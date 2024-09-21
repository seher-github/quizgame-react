import React, { useRef, useEffect, useState } from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        name:"",
        email:"",
        password:"",
    })
    //to store value in local storage
    const handleSubmit = (e)=>{
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(input));
        toast.success('Registered Successfully!');
        // Switch to login form after signup
        loginFormRef.current.style.marginLeft = "0%";
        loginTextRef.current.style.marginLeft = "0%";
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        const loginuser = JSON.parse(localStorage.getItem("user"));
        if(input.email === loginuser.email && input.password === loginuser.password){
            localStorage.setItem("LoggedIn", true);
            toast.success('Logged In Successfully!');
         navigate("/");
        }else {
            toast.error('Invalid Credentials!');
            
        }
    }

    // Create refs for the elements
    const loginTextRef = useRef(null);
    const loginFormRef = useRef(null);
    const loginBtnRef = useRef(null);
    const signupBtnRef = useRef(null);
    const signupLinkRef = useRef(null);

    // Use useEffect to add the click event listeners
    useEffect(() => {
        const loginText = loginTextRef.current;
        const loginForm = loginFormRef.current;
        const loginBtn = loginBtnRef.current;
        const signupBtn = signupBtnRef.current;
        const signupLink = signupLinkRef.current;

        signupBtn.onclick = () => {
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        };

        loginBtn.onclick = () => {
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
        };

        signupLink.onclick = (e) => {
            e.preventDefault(); // prevent default anchor behavior
            signupBtn.click(); // trigger the signup button click
        };
    }, []);

    return (
        <><ToastContainer />
            <div className="wrapper">
                
                <div className="title-text">
                    <div className="title login" ref={loginTextRef}>Login Form</div>
                    <div className="title signup">Signup Form</div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" defaultChecked />
                        <input type="radio" name="slide" id="signup" />
                        <label htmlFor="login" className="slide login" ref={loginBtnRef}>Login</label>
                        <label htmlFor="signup" className="slide signup" ref={signupBtnRef}>Signup</label>
                        <div className="slider-tab" />
                    </div>
                    <div className="form-inner">
                        <form onSubmit={handleLogin} action="#" className="login" ref={loginFormRef}>
                            <div className="field">
                                <input name="email" value={input.email} 
                                onChange={(e)=> setInput({...input,[e.target.name]:e.target.value})}
                                 type="email" placeholder="Email Address" required />
                            </div>
                            <div className="field">
                                <input name="password" value={input.password} 
                                onChange={(e)=> setInput({...input,[e.target.name]:e.target.value})}
                                 type="password" placeholder="Password" required />
                            </div>
                            <div className="pass-link"><a href="#">Forgot password?</a></div>
                            <div className="field btn">
                                <div className="btn-layer" />
                                <input type="submit" value="Login" />
                            </div>
                            <div className="signup-link">Not a member? <a href="#" ref={signupLinkRef}>Signup now</a></div>
                        </form>
                        <form onSubmit={handleSubmit} action="#" className="signup">
                            <div className="field">
                                <input name="name" value={input.name} 
                                onChange={(e)=> setInput({...input,[e.target.name]:e.target.value})}
                                 type="text" placeholder="Name" required />
                            </div>
                            <div className="field">
                                <input name="email" value={input.email} 
                                onChange={(e)=> setInput({...input,[e.target.name]:e.target.value})}
                                 type="email" placeholder="Email" required />
                            </div>
                            <div className="field">
                                <input name="password" value={input.password} 
                                onChange={(e)=> setInput({...input,[e.target.name]:e.target.value})}
                                 type="password" placeholder="Password" required />
                            </div>
                            <div className="field btn">
                                <div className="btn-layer" />
                                <input type="submit" value="Signup" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;
