import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/login.css';

export default function Login() 
{
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleForm = async (event) => {
        try
        {
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/login", {
                username: username,
                password : password
            });
    
            if(res.status === 200)
            {
                localStorage.setItem("jwtToken", res.data.token);
                navigate('/posts');
            }
        }
        catch (error)
        {
            setLoginError("Incorrect Credentials");
        }
    }

    const handleUsername = (event) => {
        console.log(event);
        setUserName(event.target.value);
        setLoginError("");
    }
    
    const handlePassword = (event) => {
        console.log(event);
        setPassword(event.target.value);
        setLoginError("");
    } 

    const register_button = () =>
    {
        navigate('/register');
    }


    return (
        <div className="login_box">
            <h1 className="login_heading">PostIt</h1>
            <form onSubmit={handleForm}>
                <input className="login_input" type = 'text' value = {username} onChange={handleUsername} placeholder="Username"></input><br></br>
                <input className="login_input" type = 'password' value = {password} onChange={handlePassword} placeholder="Password"></input><br></br>
                <h4 className="login_error">{loginError}</h4>
                <div className="login">
                    <button className="login_button">Sign in</button>
                </div>
            </form>

            <p>New here? <a className="login_reg_button" onClick={register_button}>Register</a></p>
        </div>
    );
}