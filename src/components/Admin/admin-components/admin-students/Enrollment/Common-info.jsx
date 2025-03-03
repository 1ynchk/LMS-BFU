import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Photo } from '../../../../../base-components/Photo'
import { InputWarning } from '../../../../../base-components/input-warning'

import eye from '../../../../../common-static/images/eye.png'
import { SlReload } from "react-icons/sl"
import { motion } from 'framer-motion'

import { ConcealPswr } from '../../../../bll/Login-bll/conceal-pswr'
import { generatePassword } from './../../../../bll/Common-bll/GeneratePassword';
import { PhotoBLL } from '../../../../bll/Common-bll/Photo'
import {
    EmailInput,
    GenderInput,
    UnnecessaryInput,
    InputText,
    NumberPhoneImput,
    DateInput
} from '../../../../bll/Inputs-bll/common-inputs'

const CommonInfo = (props) => {
    const navigate = useNavigate()
    const numberRef = useRef(null)
    const otchestvoRef = useRef(null)
    const [isOtchestvoActive, setOtchestvoActive] = useState(true)

    const {
        gender, setGender, accountPhoto,
        setAccountPhoto, name, setName, surname,
        setSurname, otchestvo, setOtchesctvo, number,
        setNumber, email, setEmail, password,
        setPassword, commonInfo, setCommonInfo, datebirth,
        setDatebirth } = props

    const {
        filePicker,
        dropZone,
        selectedFile,
        setSelectedFile,
        handleDragLeave,
        handleDrop,
        handleDragOver
    } = PhotoBLL()

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
        } else {
            setAccountPhoto(null)
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
            || name == '' || otchestvo == ''
            || surname == '' || number.length < 12
            || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
            || accountPhoto == null || datebirth == '' || new Date(datebirth) > new Date()
            || new Date(datebirth) < new Date('1950-01-01')
        ) {
            setCommonInfo(false)
        } else {
            setCommonInfo(true)
        }
    }, [name, otchestvo, surname, email, accountPhoto, number, datebirth])

    return (
        <motion.form
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={(e) => handleForm(e)}
            className='adminenrollment__form'>
            <div className='subsections__subtitle'>Личная информация</div>

            <div className='adminenrollment__wrapper'>
                <InputText label={'Фамилия'} value={surname} setter={setSurname} />
                <InputText label={'Имя'} value={name} setter={setName} />
                <UnnecessaryInput
                    label={'Отчество'}
                    value={otchestvo}
                    setter={setOtchesctvo}
                    _ref={otchestvoRef}
                    isActive={isOtchestvoActive}
                    setActive={setOtchestvoActive}
                />
                <DateInput value={datebirth} setter={setDatebirth} label={'Дата рождения'} />

                <GenderInput value={gender} setter={setGender} />
            </div>


            <div className='subsections__subtitle'>Контактная информация</div>
            <div className='adminenrollment__wrapper row'>
                <NumberPhoneImput value={number} setter={setNumber} _ref={numberRef} />
                <EmailInput value={email} setter={setEmail} />
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