import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useCSRF } from '../contexts/csrf-context';

import logo from '../../common-static/images/logo.png'
import eye from '../../common-static/images/eye.png'
import './login-static/css/login-panel.css'

import { ConcealPswr } from './../bll/Login-bll/conceal-pswr';
import { checkEmail, checkPswrd } from '../bll/Login-bll/check-pswrd-email';
import { fetchLogin } from './../../store/queries/Login/Login';

const LoginPanel = () => {
    const { csrftoken } = useCSRF()
    const [btnActive, setBtnActive] = useState(true)
    const dispatch = useDispatch()

    const correlateData = () => {
        if (checkEmail() && checkPswrd()) {
            setBtnActive(false)
        } else {
            setBtnActive(true)
        }
    }

    const sendQuery = (e) => {
        e.preventDefault()
        const email = document.getElementById('loginpanel_email').value
        const pswrd = document.getElementById('loginpanel_pswrd').value

        dispatch(fetchLogin({ email, pswrd, csrftoken }))
    }

    return (
        <div className="loginpanel">
            <div className='loginpanel__container'>
                <div className='loginpanel__img_container'>
                    <img src={logo} className='loginpanel__img' />

                    <div className='loginpanel__title'>Войти в систему</div>
                </div>

                <form onSubmit={(e) => sendQuery(e)}
                    className='loginpanel__form'>
                    <div className='loginpanel__input_container'>
                        <label className='loginpanel__label'>Почта</label>
                        <input
                            onChange={() => correlateData()}
                            id='loginpanel_email'
                            placeholder="Введите почту"
                            className='loginpanel__input'
                            type='email' />
                    </div>

                    <div className='loginpanel__input_container'>
                        <label className='loginpanel__label'>Пароль</label>
                        <input
                            onChange={() => correlateData()}
                            id='loginpanel_pswrd'
                            className='loginpanel__input login_input'
                            type='password'
                            placeholder='Введите пароль' />
                        <img
                            onClick={() => ConcealPswr(`.loginpanel__input.login_input`)}
                            src={eye}
                            alt='show password'
                            className='show-password' />
                    </div>

                    <button
                        disabled={btnActive}
                        className={`loginpanel__btn ${btnActive ? '' : 'active'}`}
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