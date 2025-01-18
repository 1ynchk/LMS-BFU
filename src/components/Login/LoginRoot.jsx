import bg from './login-static/images/bfu-bg.jpg'

import './login-static/css/login-root.css'
import LoginPanel from "./LoginPanel"

const LoginRoot = () => {
    return (
        <div className="loginroot">
            <LoginPanel />
            <img src={bg} alt='background' className='loginroot__bg'/>    
        </div>
    )
}

export default LoginRoot
