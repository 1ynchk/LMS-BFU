import logo from '../../common-static/images/logo.png'
import eye from '../../common-static/images/eye.png'
import './login-static/css/login-panel.css'

import { ConcealPswr } from './../bll/Login-bll/conceal-pswr';

const LoginPanel = () => {
   return (
    <div className="loginpanel">
        <div className='loginpanel__container'>
           <div className='loginpanel__img_container'>
                <img src={logo} className='loginpanel__img'/> 

                <div className='loginpanel__title'>Войти в систему</div>
            </div> 

            <form className='loginpanel__form'>
               <div className='loginpanel__input_container'>
                <label className='loginpanel__label'>Почта</label>
                <input 
                placeholder="Введите почту" 
                className='loginpanel__input' 
                type='email' /> 
               </div>

                <div className='loginpanel__input_container'>
                    <label className='loginpanel__label'>Пароль</label>
                    <input
                    id='loginpanel__pswrd' 
                    className='loginpanel__input' 
                    type='password' 
                    placeholder='Введите пароль'/> 
                    <img 
                        src={eye} 
                        alt='show password'
                        className='show-password'/>
                </div>

            <button 
                className='loginpanel__btn'
                type="submit">
                Войти в систему
            </button>

            <div className='loginpanel__bar'>
                <div className='loginpanel__subtitle'>Помощь</div>
                <div className='loginpanel__subtitle'>Забыли пароль?</div>
            </div>

            
            </form>

            
        </div>
    </div>
   ) 
}

export default LoginPanel