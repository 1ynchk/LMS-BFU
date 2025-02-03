import { NavLink, useLocation } from 'react-router-dom'
import '../../admin-static/css/admin-enrollment.css'
import { useEffect, useState, useRef } from 'react'
import { Photo } from '../../../../base-components/Photo'

import { ConcealPswr } from '../../../bll/Login-bll/conceal-pswr'
import eye from '../../../../common-static/images/eye.png'

import { InputWarning } from '../../../../base-components/input-warning'
import { SlReload } from "react-icons/sl"
import { generatePassword } from './../../../bll/Common-bll/GeneratePassword';

const AdminStudentsEnrollment = () => {

    const location = useLocation()
    const [queryParams, setQueryParams] = useState(new URLSearchParams(location.search).get('stage'))
    let content = null

    const [commonInfo, setCommonInfo] = useState(false)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const newStage = queryParams.get('stage')
        setQueryParams(newStage)
    }, [location.search])

    useEffect(() => {
        const set = document.querySelectorAll('.adminenrollment__section')
        set.forEach(el => {
            el.classList.remove('choisen')
        })
        switch (true) {
            case queryParams == null:
                set[0].classList.add('choisen')
                break
            case queryParams == 'documents':
                set[0].classList.add('choisen')
                set[1].classList.add('choisen')
                break
            case queryParams == 'confirm':
                set[0].classList.add('choisen')
                set[1].classList.add('choisen')
                set[2].classList.add('choisen')
                break
        }
    }, [queryParams])

    switch (true) {
        case queryParams == null:
            content = <CommonInfo
                commonInfo={commonInfo}
                setCommonInfo={setCommonInfo} />
            break
        case queryParams == 'documents':
            content = null
            break
        case queryParams == 'confirm':
            content = null
            break
    }

    return (
        <div className="adminenrollment">

            <div className="subsection__name">Зачисление</div>
            <div className='adminenrollment__stages'>
                <NavLink
                    to='/admin/students/enrollment/'
                    className='adminenrollment__section'>Общая информация</NavLink>
                <NavLink
                    to='/admin/students/enrollment/?stage=documents'
                    className='adminenrollment__section'>Документы</NavLink>
                <NavLink
                    to='/admin/students/enrollment/?stage=confirm'
                    className='adminenrollment__section'>Подтверждение</NavLink>
            </div>
            {content}

        </div>
    )
}

const CommonInfo = ({ commonInfo, setCommonInfo }) => {
    const [isBtnActive, setBtnActive] = useState(false)

    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [otchestvo, setOtchesctvo] = useState(null)
    const [number, setNumber] = useState('+7 ')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(generatePassword())

    const numberRef = useRef(null)
    const otchestvoRef = useRef(null)
    const [isOtchestvoActive, setOtchestvoActive] = useState(true)

    const handleForm = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        if (
            name == null || otchestvo == null || surname == null
            || number == null || email == null || password == null
            || name.length < 2 || otchestvo.length < 6
            || surname.length < 2
        ) {
            setCommonInfo(false)
        } else {
            setCommonInfo(true)
        }
    }, [name, otchestvo])

    useEffect(() => {
        if (!isOtchestvoActive) {
            setOtchesctvo(null)
            otchestvoRef.current.value = ' '
        }
    }, [isOtchestvoActive])

    return (
        <form onSubmit={(e) => handleForm(e)} className='adminenrollment__form'>
            <div className='subsections__subtitle'>Личная информация</div>
            <div className='adminenrollment__subsection'>
                <div className='adminenrollment__wrapper'>
                    <div className='adminenrollment__container'>
                        <div className="subsection__label">Фамилия</div>
                        <input
                            onChange={(e) => setSurname(e.target.value)}
                            className="subsection__input" />
                        {
                            surname == null || surname.length < 2 && (
                                <InputWarning
                                    text='Фамилия должна быть длинее двух символов' />
                            )
                        }
                    </div>

                    <div className='adminenrollment__container'>
                        <div className="subsection__label">Имя</div>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className="subsection__input" />
                        {
                            name == null || name.length < 2 && (
                                <InputWarning
                                    text='Имя должно быть длинее двух символов' />
                            )
                        }
                    </div>

                    <div className='adminenrollment__container'>
                        <div className="subsection__label">
                            Отчество
                            <input
                                type='checkbox'
                                className='cat_otchestvo'
                                onChange={() => setOtchestvoActive(!isOtchestvoActive)}
                                checked={isOtchestvoActive} />
                        </div>
                        <input
                            disabled={!isOtchestvoActive}
                            ref={otchestvoRef}
                            onChange={(e) => setOtchesctvo(e.target.value)}
                            className="subsection__input" />
                        {
                            otchestvo == null || otchestvo.length < 6 && (
                                <InputWarning
                                    text='Отчество должно быть длинее 5 символов' />
                            )
                        }
                    </div>
                </div>
                <div className='adminenrollment__photo'>
                    <Photo />
                </div>
            </div>
            <div className='subsections__subtitle'>Контактная информация</div>
            <div className='adminenrollment__wrapper row'>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Номер телефона</div>
                    <input
                        value={number}
                        ref={numberRef}
                        onFocus={(e) => {
                            if (e.target.value == '+7 ') {
                                setNumber('+7')
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key == 'Backspace' && e.target.value === '+7') {
                                e.preventDefault()
                            }
                        }}
                        onChange={(e) => {
                            if (/^\d*$/.test(e.target.value.slice(1))) {
                                setNumber(e.target.value)
                            }
                        }}
                        className="subsection__input" />
                    {
                        number == '+7 ' || number.length < 12
                        && (
                            <InputWarning
                                text='Номер телефона должен быть не короче 11 символов' />
                        )
                    }
                    {
                        number == "+7" || number.length > 12 && (
                            <InputWarning
                                text='Номер телефона должен быть не длинее 11 символов' />
                        )
                    }
                </div>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Почта</div>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="subsection__input" />
                    {
                        email == null || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && (
                            <InputWarning text='Не валидная почта' />
                        )
                    }
                </div>
            </div>
            <div className='subsections__subtitle'>Информация аккаунта</div>
            <div className='adminenrollment__wrapper row'>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Пароль</div>
                    <input
                        value={password}
                        disabled={true}
                        type='password'
                        className="subsection__input adminenrollment" />
                    <img
                        onClick={() => ConcealPswr('.subsection__input.adminenrollment')}
                        src={eye}
                        alt='show password'
                        className='show-password-adminenrollment' />
                    <SlReload
                        onClick={() => setPassword(generatePassword())}
                        className='generate-password'
                    />
                </div>
            </div>

            <div className='adminnewsadd__btn_container'>
                <button
                    className='adminnewsadd__button'
                    type='submit'>
                    Продолжить
                </button>
            </div>
        </form>
    )
}

export default AdminStudentsEnrollment