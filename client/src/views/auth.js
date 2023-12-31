import LoginForm from "../components/auth/loginForm"
import RegisterForm from "../components/auth/registerForm"
import { Redirect } from "react-router-dom"
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../contexts/contants";


const Auth = ({authRoute}) => {
    const accesstoken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
    let body

    if (accesstoken)
    body = (
        <Redirect to='/dashboard' />
        )
    else
    body = (

        <>
        LearnIt
        {authRoute === 'login' && <LoginForm/>}
        {authRoute === 'register' && <RegisterForm/>}

        </>
    )
    return(
       <div className="landing">
        <div className="dark-overlay">
        <div className="landing-inner">
            <h1>LearnIt</h1>
            <h4>Keep track of what are you learning</h4>
            {body}
        </div>
        </div>
       </div>
    )
}

export default Auth