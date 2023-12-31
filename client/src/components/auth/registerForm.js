import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useHistory} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

const RegisterForm = () => {
    
    const {registerUser} = useContext(AuthContext)

    //router
    const history = useHistory()

    //Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const {username,password,confirmPassword} = registerForm
    const onChangeRegisterForm = event =>
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value
		})
    const register = async event => {
        event.preventDefault()
        if (password !== confirmPassword) {
			console.log('sai pass');
		}
        try {
			const registerData = await registerUser(registerForm)
            history.push('/')
			if (!registerData.success) {
                console.log("sucess");
			}
		} catch (error) {
			console.log(error)
		}
    }

    return (<>
        <Form className='my-4' onSubmit={register}>
            <Form.Group className='mb-1'>
                <Form.Control type='text' placeholder='Username' name='username' required value={username} onChange={onChangeRegisterForm}/>
            </Form.Group>
            <Form.Group className='mb-1'>
                <Form.Control type='text' placeholder='Password' name='password' required value={password} onChange={onChangeRegisterForm}/>
            </Form.Group>
            <Form.Group className='mb-1'>
                <Form.Control type='text' placeholder='Confirm Password' name='confirmPassword' required value={confirmPassword} onChange={onChangeRegisterForm}/>
            </Form.Group>
            <Button variant="success" type='submit'>Register</Button>
        </Form>
        <p>Already an account
            <Link to='/login'>
                <Button variant='info' size='sm' className='ml-2'>Login</Button>
            </Link>
        </p>
        </>
    )
}

export default RegisterForm