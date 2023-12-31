import React from 'react';
import LoginForm from "../components/auth/loginForm"
import RegisterForm from "../components/auth/registerForm"
import { Redirect } from "react-router-dom"
import classNames from "classnames/bind"
import styles from './views.module.scss'
import Navbar from './navbar';
import Content from './content';
import AddCard from './addCard';

const cx = classNames.bind(styles)

const Dashboard = ()=>{
    const accesstoken = localStorage.getItem('learnit-mern')
    let body
    if(accesstoken){
        body = (
            <div >
                <Navbar />
                <AddCard />
                <Content />
            </div>
        )
    }else{
        body = (
            <Redirect to='/' />
        )
    }
    return (
        <div>
           {body} 
        </div>
        
    )
}

export default Dashboard