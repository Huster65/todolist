import React from "react";
import { useState, useEffect } from "react";
import Card from "./card";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../contexts/contants";

function Content() {
    const [data, setData] = useState([])
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`${apiUrl}/post`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                const datas = res.data.posts
                setData(datas)
                console.log('data', data);
            }catch(err){
                console.log('error');
            }
        }
        fetchData()
    },[data])
    return ( 
     
        <div className='card-list'>
            {data.map(item => (
                <div>
                    <Card 
                        id={item._id} 
                        title={item.title} 
                        description={item.description} 
                        link={item.url} 
                        status={item.status}
                    />
                </div>
            ))}
        </div>
       
        
     );
}

export default Content;