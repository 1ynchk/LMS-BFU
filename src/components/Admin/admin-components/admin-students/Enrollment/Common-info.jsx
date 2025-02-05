import { useEffect, useState, useRef } from 'react'

import { Photo } from '../../../../../base-components/Photo'
import { InputWarning } from '../../../../../base-components/input-warning'

import eye from '../../../../../common-static/images/eye.png'
import { SlReload } from "react-icons/sl"
import { motion } from 'framer-motion'

import { ConcealPswr } from '../../../../bll/Login-bll/conceal-pswr'
import { generatePassword } from './../../../../bll/Common-bll/GeneratePassword';
import { PhotoBLL } from '../../../../bll/Common-bll/Photo'
import { useNavigate } from 'react-router-dom'

const CommonInfo = (props) => {
    const navigate = useNavigate()
    const numberRef = useRef(null)
    const otchestvoRef = useRef(null)
    const [isOtchestvoActive, setOtchestvoActive] = useState(true)

    const {
        gender,
        setGender,
        accountPhoto,
        setAccountPhoto,
        name,
        setName,
        surname,
        setSurname,
        otchestvo,
        setOtchesctvo,
        number,
        setNumber,
        email,
        setEmail,
        password,
        setPassword,
        commonInfo,
        setCommonInfo,
        datebirth,
        setDatebirth,
    } = props

    const {
        filePicker,
        dropZone,
        selectedFile,
        setSelectedFile, } = PhotoBLL()

    const handleForm = (e) => {
        e.preventDefault()
        navigate('/admin/students/enrollment/?stage=documents')
    }

    useEffect(() => {
        setSelectedFile(accountPhoto)
    }, [])

    useEffect(() => {
        if (selectedFile != null) {
            setAccountPhoto(selectedFile)
            return
        }
    }, [selectedFile])

    useEffect(() => {
        if (otchestvo == 'Отсутствует') {
            setOtchestvoActive(false) 
        }
    }, [])

    useEffect(() => {
        if (
            name == null || otchestvo == null || surname == null
            || number == null || email == null || password == null
            || name.length < 2 || otchestvo.length < 5
            || surname.length < 2 || number.lentgh > 12 || number.length < 12
            || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
            || accountPhoto == null || datebirth == '' || new Date(datebirth) > new Date()
            || new Date(datebirth) < new Date('1950-01-01')
        ) {
            setCommonInfo(false)
        } else {
            setCommonInfo(true)
        }
    }, [name, otchestvo, surname, email, accountPhoto, number])

    return (
        <motion.form
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={(e) => handleForm(e)}
            className='adminenrollment__form'>
            <div className='subsections__subtitle'>Личная информация</div>

            <div className='adminenrollment__wrapper'>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Фамилия</div>
                    <input
                        value={surname == null ? '' : surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="subsection__input" />
                    {
                        surname == null || surname.length < 2 && (
                            <InputWarning
                                text='Фамилия должна быть не менее двух символов' />
                        )
                    }
                </div>

                <div className='adminenrollment__container'>
                    <div className="subsection__label">Имя</div>
                    <input
                        value={name == null ? '' : name}
                        onChange={(e) => setName(e.target.value)}
                        className="subsection__input" />
                    {
                        name == null || name.length < 2 && (
                            <InputWarning
                                text='Имя должно быть не менее двух символов' />
                        )
                    }
                </div>

                <div className='adminenrollment__container'>
                    <div className="subsection__label">
                        Отчество
                        <input
                            type='checkbox'
                            className='cat_otchestvo'
                            onChange={() => {
                                if (!isOtchestvoActive) {
                                    setOtchesctvo(null)
                                    setOtchestvoActive(true)
                                    otchestvoRef.current.value = ''
                                } else {
                                    setOtchesctvo('Отсутствует')
                                    setOtchestvoActive(false)
                                    otchestvoRef.current.value = 'Отсутствует'
                                }
                            }}
                            checked={isOtchestvoActive} />
                    </div>
                    <input
                        value={otchestvo == null ? '' : otchestvo}
                        disabled={!isOtchestvoActive}
                        ref={otchestvoRef}
                        onChange={(e) => setOtchesctvo(e.target.value)}
                        className="subsection__input" />
                    {
                        otchestvo == null || otchestvo.length < 5 && (
                            <InputWarning
                                text='Отчество должно быть не менее 5 символов' />
                        )
                    }

                </div>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Дата рождения</div>
                    <input
                        value={datebirth}
                        type='date'
                        onChange={(e) => setDatebirth(e.target.value)}
                        className="subsection__input" />
                    {
                        new Date(datebirth) > new Date() && <InputWarning
                            text='Слишком большая дата' />
                    }
                    {
                        new Date(datebirth) < new Date('1950-01-01') && <InputWarning
                            text='Слишком маленькая дата' />
                    }
                </div>

            </div>

            <div className='adminenrollment__container'>
                <div className="subsection__label">Пол</div>
                <div className='adminenrollment__radion_wrapper'>
                    <div className='adminenrollment__radio'>
                        <div className='subsection__radio'>Мужской</div>
                        <input
                            onChange={() => setGender(gender == 'Мужской' ? 'Женский' : 'Мужской')}
                            checked={gender == 'Мужской' ? true : false}
                            name='sex'
                            type='radio'
                            className="subsection__radio" />
                    </div>
                    <div className='adminenrollment__radio'>
                        <div className='subsection__radio'>Женский</div>
                        <input
                            onChange={() => setGender(gender == 'Женский' ? 'Мужской' : 'Женский')}
                            checked={gender == 'Женский' ? true : false}
                            name='sex'
                            type='radio'
                            className="subsection__radio" />
                    </div>
                </div>
            </div>

            <div className='subsections__subtitle'>Контактная информация</div>
            <div className='adminenrollment__wrapper row'>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Номер телефона</div>
                    <input
                        maxLength={12}
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
                </div>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Почта</div>
                    <input
                        value={email == null ? '' : email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="subsection__input" />
                    {
                        email == null || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) && (
                            <InputWarning text='Не валидная почта' />
                        )
                    }
                </div>
            </div>
            <div className='subsections__subtitle'>Информация аккаунта</div>
            <div className='adminenrollment__wrapper row'>
                <div className='adminenrollment__photo'>
                    <Photo
                        filePicker={filePicker}
                        dropZone={dropZone}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile} />
                    {
                        accountPhoto == null || selectedFile == null && <InputWarning
                            text='Это обязательное поле' />
                    }
                </div>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Пароль</div>
                    <input
                        value={password}
                        disabled={true}
                        type='password'
                        className="subsection__input adminenroll" />
                    <img
                        onClick={() => ConcealPswr('.subsection__input.adminenroll')}
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
                    disabled={!commonInfo}
                    className='subsection__btn'
                    type='submit'>
                    {!commonInfo ? 'Не все поля заполнены' : 'Продолжить'}
                </button>
            </div>
        </motion.form>
    )
}

export default CommonInfo