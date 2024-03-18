import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./css/content_post.css"
import EditPost from "./EditPost";

export default function Posts()
{
    const params = useParams();
    const [apiData, setApiData] = useState([]);
    const [loading, isLoading] = useState(true);
    const navigate = useNavigate();
    const [delete_error, SetError] = useState('');
    
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        if(localStorage.getItem("jwtToken"))
        {
            (async () =>
            {
                try
                {
                    console.log(params.postId);
                    const response = await axios.get(`http://localhost:3001/posts/${params.postId}`, {
                        headers : {
                            authorization : "Bearer " + localStorage.getItem("jwtToken")
                        }
                    });
                    setApiData(response.data);
                    console.log(response);
                    isLoading(false);
                }
                catch(error)
                {
                    console.log(error);
                }
            })()
        }
        else
        {
            navigate('/login');
        }
    }, [])

    if(loading)
    {
        return(
            <h1>Loading...</h1>
        )
    }

    const go_back = () =>
    {
        navigate('/posts');
    }

    const delete_button = async () =>
    {
        try
        {
            await axios.delete(`http://localhost:3001/posts/${params.postId}`, {
                headers : {
                    authorization : "Bearer " + localStorage.getItem("jwtToken")
                }
            });
            navigate('/posts');
        }
        catch(error)
        {
            SetError("Acess Denied! You are not the owner of this post");
        }
    }
    

    const edit_button = async () =>
    {
        if(!edit)
        {
            setEdit(true);
        }
    }

    
        
    return (
        <div className="post_title">
            <div>
                <button className="back_button" onClick={go_back}>Go Back</button>
            </div>

            <div>
                <p className="delete_error">{delete_error}</p>
                <div className="content_title">
                    <h2>Title - </h2> &nbsp;
                    <h2>{apiData.title}</h2> 
                </div>
            </div>
            <div className="post_content_footer">
                <button className="post_delete" onClick={delete_button}>Delete</button>
                <button className="post_edit" onClick={edit_button}>Edit</button>
            </div>
            <div className="post_content">
                <h2>Content </h2>
                <EditPost content = {apiData.content} flag = {edit}></EditPost>
            </div>
            
        </div>
    );
}