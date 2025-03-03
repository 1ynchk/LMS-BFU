import bg from './login-static/images/bfu-bg.jpg'

import './login-static/css/login-root.css'
import LoginPanel from "./LoginPanel"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const LoginRoot = () => {

    const navigate = useNavigate() 
    const role = useSelector(state => state.user.role)
    const auth = localStorage.getItem('auth')

    useEffect(() => {
        if (auth && role) {
            navigate(`/${role}/main-page/`)
        } 
    }, [role])

    return (
        <div className="loginroot">
            <LoginPanel />
            <img src={bg} alt='background' className='loginroot__bg'/>    
        </div>
    )
}

export default LoginRoot
