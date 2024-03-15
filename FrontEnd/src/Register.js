import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import "./css/register.css"

export default function Register()
{
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleForm =  async (event) => {
        try{
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/register", {
                username : username,
                password : password
            })
            if(res.status === 201)
            {
                navigate('/login');
            }
        }
        catch(error)
        {
            return (
                <h1>{error}</h1>
            )
        }
    }

    const login_button = () =>
    {
        navigate('/login');
    }

    

    return (
        <div className="reg_box">
            <h1 className="reg_heading">YOU_POST</h1>
            <form onSubmit={handleForm}>
                <input className="reg_input" type = 'text' value = {username} onChange={handleUsername} placeholder="Username"></input><br></br>
                <input className="reg_input" type = 'password' value = {password} onChange={handlePassword} placeholder="Password"></input><br></br>
                <button className="reg_button">Register</button>
            </form>
            <p>Already have an account? <a className="reg_login_button" onClick={login_button}>Login</a></p>
        </div>
    );
}