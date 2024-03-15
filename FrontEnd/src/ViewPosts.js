import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./css/posts.css";

export default function Viewport()
{
    const [apiData, setApiData] = useState([]);
    const [loading, isLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [ErrorType, setErrorType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("jwtToken"))
        {
            (async () =>
            {
                try
                {
                    const response = await axios.get("http://localhost:3001/posts", {
                        headers : {
                            authorization : "Bearer " + localStorage.getItem("jwtToken")
                        }
                    });
                    setApiData(response.data);
                    console.log(response.data);
                    isLoading(false);
                }
                catch(error)
                {
                    setErrorType(error.message);
                    setApiError(true);
                }
            })()
        }
        else
        {
            navigate('/login');
        }
    }, [])

    const create = () =>
    {
        navigate('/create_post');
    }

    const post_content = (res) =>
    {
        navigate(`/posts/${res}`);
    }
    const logout = () =>
    {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }

    const displayData = apiData.map((data) => <p className="post_data" onClick={() => {
        post_content(data._id);
      }} key = {data.id}>Title: {data.title}<br/> Posted By - {data.username} </p>);

    if(apiError)
    {
        return (
            <div>
                <h1>{ErrorType}</h1>
            </div>
        ) 
    }
    if(loading)
    {
        return <h1>Loading...</h1>
    }

    const about = () =>
    {
        navigate('/about_us');
    }

    return (
        <div className="post_box">
            <div className="post_header">
                <h1 className="post_heading">Posts </h1>
            </div>
            <div className="post_footer">
                <button className="post_create" onClick={create}>Create Post</button>
                <button className="logout_button" onClick={logout}>Logout</button>
                <button className="about_button" onClick={about}>About Us</button>  
            </div>
            <div className="post_div"></div>
            <h3 className="post_div">{displayData}</h3>
        </div>
    );
}
