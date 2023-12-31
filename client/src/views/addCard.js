import React from "react";
import { useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../contexts/contants";
function AddCard() {
    //state
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        status: '',

    })
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    // handle    
    const changeForm = () => {
        setIsFormVisible(!isFormVisible);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${apiUrl}/post`,formData,config)
            console.log('Dữ liệu đã được gửi thành công:', response.data);

            setFormData({
                title: '',
                description: '',
                url: '',
                status: '',
              });
            setIsFormVisible(false);
        }catch(error){
            console.error('Lỗi khi gửi dữ liệu:', error);
            setIsFormVisible(false);
        }
    }
   

    return ( 
    <div className="add">
        <button className="add-card" onClick={changeForm}>ADD</button>
        {isFormVisible ? (
            <div className="overlay">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <label>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}></input>
                        <label>Description</label>
                        <input type="text" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></input>
                        <label>Link video</label>
                        <input type="text" name="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })}></input>
                        <label>Status</label>
                        <input type="text" name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}></input>
                        <button type="submit" className="buttons">Lưu</button>
                        <button onClick={changeForm} className="close-btn">Đóng</button>
                    </form>
                </div>
            </div>) 
            : 
            (<div></div>)
        }
    </div> 
    );
}

export default AddCard;