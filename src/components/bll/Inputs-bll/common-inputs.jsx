import { useState } from "react"
import { generatePassword } from "../Common-bll/GeneratePassword"
import { InputWarning } from "../../../base-components/input-warning"

export const CommonInputs = () => {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [otchestvo, setOtchesctvo] = useState(null)
    const [number, setNumber] = useState('+7 ')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(generatePassword())
    const [datebirth, setDatebirth] = useState('')
    const [accountPhoto, setAccountPhoto] = useState(null)
    const [gender, setGender] = useState('Мужской')

    return {
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
        datebirth,
        setDatebirth,
    }
}

export const UseStudentDocuments = () => {

    // passport
    const [citizenship, setCitizenship] = useState(null)
    const [issuedBy, setIssuedBy] = useState(null)
    const [dateIssuance, setDateIssuence] = useState('')
    const [codeSubDepartment, setCodeSubDepartment] = useState(null)
    const [passportSerial, setPassportSerial] = useState(null)
    const [passportNumber, setPassportNumber] = useState(null)

    return {
        citizenship,
        setCitizenship,
        issuedBy,
        setIssuedBy,
        dateIssuance,
        setDateIssuence,
        codeSubDepartment,
        setCodeSubDepartment,
        passportSerial,
        setPassportSerial,
        passportNumber,
        setPassportNumber
    }
}

export const UseStudentRussianDocuments = () => {
    const [snils, setSnils] = useState(null)
    const [INN, setINN] = useState(null)

    return {
        snils,
        setSnils,
        INN,
        setINN
    }
}

export const InputText = (props) => {
    const { label, value, setter, max_length} = props

    return (
        <div className='adminenrollment__container'>
            <div className="subsection__label">{label}</div>
            <input
                maxLength={max_length} 
                value={value == null ? '' : value}
                onChange={(e) => setter(e.target.value)}
                className="subsection__input" />
            {
                value == null || value == '' && (
                    <InputWarning
                        text='Это обязательное поле' />
                )
            }
        </div>
    )
}

export const UnnecessaryInput = (props) => {
    const { value, setter, label, _ref, isActive, setActive } = props

    return (
        <div className='adminenrollment__container'>
            <div className="subsection__label">
                {label}
                <input
                    type='checkbox'
                    className='cat_otchestvo'
                    onChange={() => {
                        if (!isActive) {
                            setter(null)
                            setActive(true)
                            _ref.current.value = ''
                        } else {
                            setter('Отсутствует')
                            setActive(false)
                            _ref.current.value = 'Отсутствует'
                        }
                    }}
                    checked={isActive} />
            </div>
            <input
                value={value == null ? '' : value}
                disabled={!isActive}
                ref={_ref}
                onChange={(e) => setter(e.target.value)}
                className="subsection__input" />
            {
                value == null || value == '' && (
                    <InputWarning
                        text='Это обязательное поле' />
                )
            }
        </div>
    )
}

export const NumberPhoneImput = (props) => {
    const { value, _ref, setter } = props

    return (
        <div className='adminenrollment__container'>
            <div className="subsection__label">Номер телефона</div>
            <input
                maxLength={12}
                value={value}
                ref={_ref}
                onFocus={(e) => {
                    if (e.target.value == '+7 ') {
                        setter('+7')
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key == 'Backspace' && e.target.value === '+7') {
                        e.preventDefault()
                    }
                }}
                onChange={(e) => {
                    if (/^\d*$/.test(e.target.value.slice(1))) {
                        setter(e.target.value)
                    }
                }}
                className="subsection__input" />
            {
                value == '+7 ' || value.length < 12
                && (
                    <InputWarning
                        text='Номер телефона должен быть не короче 11 символов' />
                )
            }
        </div>
    )
}

export const DateInput = (props) => {
    const { value, setter, label } = props

    return (
        <div className='adminenrollment__container'>
            <div className="subsection__label">{label}</div>
            <input
                value={value}
                type='date'
                onChange={(e) => setter(e.target.value)}
                className="subsection__input" />
            {
                new Date(value) > new Date() && <InputWarning
                    text='Слишком большая дата' />
            }
            {
                new Date(value) < new Date('1950-01-01') && <InputWarning
                    text='Слишком маленькая дата' />
            }
        </div>
    )
}

export const GenderInput = (props) => {
    const { value, setter } = props

    return (
        <div className='adminenrollment__container'>
            <div className="subsection__label">Пол</div>
            <div className='adminenrollment__radion_wrapper'>
                <div className='adminenrollment__radio'>
                    <div className='subsection__radio'>Мужской</div>
                    <input
                        onChange={() => setter(value == 'Мужской' ? 'Женский' : 'Мужской')}
                        checked={value == 'Мужской' ? true : false}
                        name='sex'
                        type='radio'
                        className="subsection__radio" />
                </div>
                <div className='adminenrollment__radio'>
                    <div className='subsection__radio'>Женский</div>
                    <input
                        onChange={() => setter(value == 'Женский' ? 'Мужской' : 'Женский')}
                        checked={value == 'Женский' ? true : false}
                        name='sex'
                        type='radio'
                        className="subsection__radio" />
                </div>
            </div>
        </div>
    )
}

export const EmailInput = (props) => {
    const { value, setter } = props

    return (
        <div className='adminenrollment__container'>
            <div className="subsection__label">Почта</div>
            <input
                value={value == null ? '' : value}
                onChange={(e) => setter(e.target.value)}
                className="subsection__input" />
            {
                value == null || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) && (
                    <InputWarning text='Не валидная почта' />
                )
            }
        </div>
    )
}