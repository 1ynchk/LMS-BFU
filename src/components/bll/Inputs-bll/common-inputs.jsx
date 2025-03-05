import { useEffect, useState } from "react"
import { generatePassword } from "../Common-bll/GeneratePassword"
import { InputWarning } from "../../../base-components/input-warning"
import { motion } from "framer-motion"

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

    const clearStateCommonInfo = () => {
        setName(null)
        setSurname(null)
        setOtchesctvo(null)
        setNumber('+7 ')
        setEmail(null)
        setPassword(generatePassword())
        setDatebirth('')
        setAccountPhoto(null)
        setGender('Мужской')
    }

    return {
        clearStateCommonInfo,
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

    // education
    const [edNumber, setEdNumber] = useState(null)
    const [edDateIssuance, setEdDateIssuance] = useState('')
    const [edIssuedBy, setEdIssuedBy] = useState(null)

    const clearStateStudentDocuments = () => {
        setCitizenship(null)
        setIssuedBy(null)
        setDateIssuence('')
        setCodeSubDepartment(null)
        setPassportNumber(null)
        setPassportSerial(null)
        setEdDateIssuance('')
        setEdNumber(null)
        setEdIssuedBy(null)
    }

    return {
        clearStateStudentDocuments,
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
        setPassportNumber,

        edNumber,
        setEdNumber,
        edDateIssuance,
        setEdDateIssuance,
        edIssuedBy,
        setEdIssuedBy
    }
}

export const UseStudentRussianDocuments = () => {
    const [snils, setSnils] = useState(null)
    const [INN, setINN] = useState(null)

    const clearStateRussianDocs = () => {
        setSnils(null)
        setINN(null)
    }

    return {
        snils,
        setSnils,
        INN,
        setINN,
        clearStateRussianDocs
    }
}

export const UseStudentForeignDocuments = () => {
    const [fpNumber, setFpNumber] = useState(null)
    const [fpDateIssuance, setFpDateIssuance] = useState('')
    const [fpExpireDate, setFpExpireDate] = useState('')
    const [fpIssuedBy, setFpIssuedBy] = useState(null)
    const [mcNumber, setMcNumber] = useState(null)
    const [mcDateEntry, setMcDateEntry] = useState('')

    const clearStateForeignDocs = () => {
        setFpNumber(null)
        setFpDateIssuance('')
        setFpExpireDate('')
        setFpIssuedBy(null)
        setMcNumber(null)
        setMcDateEntry('')
    }

    return {
        clearStateForeignDocs,
        fpNumber,
        setFpNumber,
        fpDateIssuance,
        setFpDateIssuance,
        fpExpireDate,
        setFpExpireDate,
        fpIssuedBy,
        setFpIssuedBy,
        mcNumber,
        setMcNumber,
        mcDateEntry,
        setMcDateEntry
    }
}
export const DisabledField = (props) => {
    let { label, value } = props

    return (
        <div className='adminenrollment__container'>
            <div
                className="subsection__label">
                {label}
            </div>
            <input
                disabled={true}
                value={value == null ? '' : value}
                className="subsection__input confirmation" />
        </div>
    )
}
export const InputText = (props) => {
    let { label, value, setter, max_length, isDisabled } = props

    return (
        <div className='adminenrollment__container'>
            {
                isDisabled != undefined && (<motion.div
                    animate={{
                        backgroundColor: isDisabled ? '#ffff0033' : '#8080804c',
                        color: isDisabled ? '#000000' : '#ffffff'
                    }}
                    transition={{ duration: 0.5 }}
                    className="subsection__label">
                    {label}
                </motion.div>)
            }
            {
                isDisabled == undefined && (
                    <div
                        className="subsection__label">
                        {label}
                    </div>)
            }
            <input
                disabled={isDisabled == undefined ? false : !isDisabled}
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

    const handleChange = (e) => {
        let newValue = e.target.value.replace(/[^\d]/g, '')
        if (!newValue.startsWith('7')) {
            newValue = '7' + newValue
        }
        setter('+' + newValue)
    }

    return (
        <div className='adminenrollment__container'>
            <div className="subsection__label">Номер телефона</div>
            <input
                maxLength={12}
                value={value}
                ref={_ref}
                onFocus={(e) => {
                    if (!e.target.value.startsWith('+7')) {
                        setter('+7')
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.target.value === '+7') {
                        e.preventDefault()
                    }
                }}
                onChange={handleChange}
                className="subsection__input"
            />
            {value.length < 12 && (
                <InputWarning text='Номер телефона должен быть не короче 11 символов' />
            )}
        </div>
    )
}

const OnlyNumbers = (props) => {

    const {
        value, setter, label
    } = props

    const handleChange = (e) => {
        let newValue = e.target.value.replace(/[^\d]/g, '')
        setter(newValue)
    }

    return (
        <div className='adminenrollment__container'>
            <div className="subsection__label">{label}</div>
            <input
                maxLength={12}
                value={value}
                onChange={handleChange}
                className="subsection__input"
            />
            {
                value == null || value == '' && (
                    <InputWarning
                        text='Это обязательное поле' />
                )
            }
        </div>
    )
}

export const DateInput = (props) => {
    const { value, setter, label, isDisabled } = props

    return (
        <div className='adminenrollment__container'>
            {
                isDisabled != undefined && (<motion.div
                    animate={{
                        backgroundColor: isDisabled ? '#ffff0033' : '#8080804c',
                        color: isDisabled ? '#000000' : '#ffffff'
                    }}
                    transition={{ duration: 0.5 }}
                    className="subsection__label">
                    {label}
                </motion.div>)
            }
            {
                isDisabled == undefined && (
                    <div
                        className="subsection__label">
                        {label}
                    </div>)
            }
            <input
                disabled={isDisabled == undefined ? false : !isDisabled}
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