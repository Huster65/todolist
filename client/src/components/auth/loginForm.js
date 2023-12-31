import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useHistory} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

const LoginForm = () => {
    //context
    const {loginUser} = useContext(AuthContext)

    //router
    const history = useHistory()

    //Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const {username,password} = loginForm
    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]:event.target.value})

    const login = async event => {
        // ngăn chặn trình duyệt gửi yêu cầu HTTP để tải lại trang web sau khi người dùng nhấn nút "submit".
        event.preventDefault()
        try{
            const loginData = await loginUser(loginForm)
            if(loginData.success){
                // loadUser()
                history.push('/dashboard')
                // return <Redirect to='/dashboard' />
            }else{

            }
        }catch(error){
            console.log(error)
        }
        
    }

    
    return (<>
        <Form className='my-4' onSubmit={login}>
            <Form.Group className='mb-1'>
                <Form.Control type='text' placeholder='Username' name='username' required value={username} onChange={onChangeLoginForm}/>
            </Form.Group>
            <Form.Group className='mb-1'>
                <Form.Control type='password' placeholder='Password' name='password' required value={password} onChange={onChangeLoginForm}/>
            </Form.Group>
            <Button variant="success" type='submit'>Login</Button>
        </Form>
        <p>Don't have an account
            <Link to='/register'>
                <Button variant='info' size='sm' className='ml-2'>Register</Button>
            </Link>
        </p>
        </>
    )
}

export default LoginForm