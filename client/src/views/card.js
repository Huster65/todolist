import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Card({ id ,title, description, link, status }) {

    const tokens = localStorage.getItem('learnit-mern')
    
    const deleteFunction = async () => {
        try{
            axios.delete(`http://localhost:5000/api/post/${id}`,{
                headers:{
                    Authorization: `Bearer ${tokens}`
                }
            })
        }catch(error){
            console.log("error",error);
        }
    }

    return ( 
        <div className="card">
            <h2>{title}</h2>
            <p>{description}</p>
            <a href={link}>Video</a>
            <p className="status">{status}</p>
            <button onClick={deleteFunction} className="delete-card-btn">Xóa</button>
        </div>
     );
}


export default Card ;