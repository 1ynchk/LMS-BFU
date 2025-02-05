
import { useEffect, useState, useRef } from 'react';

import { motion } from 'framer-motion';

import CommonInfo from './Common-info';
import { InputWarning } from '../../../../../base-components/input-warning';

const StudentDocuments = (props) => {

    const [isPassportSerial, setIsPassportSerial] = useState(true)
    const serialRef = useRef(null)

    const {
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
    } = props

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    console.log(passportSerial)

    return (
        <motion.form
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={(e) => handleSubmit(e)}
            className="studentdocuments">
            <div className='subsections__subtitle'>Паспорт</div>
            <div className='adminenrollment__wrapper'>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Гражданство</div>
                    <input
                        value={citizenship == null ? '' : citizenship}
                        onChange={(e) => setCitizenship(e.target.value)}
                        className="subsection__input" />
                    {
                        citizenship == null || citizenship.length < 2 && (
                            <InputWarning
                                text='Это обязательное поле' />
                        )
                    }
                </div>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">
                        Серия
                        <input
                            type='checkbox'
                            className='cat_otchestvo'
                            onChange={() => {
                                if (!isPassportSerial) {
                                    setPassportSerial(null)
                                    setIsPassportSerial(true)
                                    serialRef.current.value = ''
                                } else {
                                    setPassportSerial('Отсутствует')
                                    setIsPassportSerial(false)
                                    serialRef.current.value = 'Отсутствует'
                                }
                            }}
                            checked={isPassportSerial} />
                    </div>
                    <input
                        value={passportSerial == null ? '' : passportSerial}
                        disabled={!isPassportSerial}
                        ref={serialRef}
                        onChange={(e) => setPassportSerial(e.target.value)}
                        className="subsection__input" />
                    {
                        passportSerial == null || passportSerial.length < 2 && (
                            <InputWarning
                                text='Это обязательное поле' />
                        )
                    }
                </div>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Номер</div>
                    <input
                        value={passportNumber == null ? '' : passportNumber}
                        onChange={(e) => { setPassportNumber(e.target.value) }}
                        className="subsection__input" />
                    {
                        passportNumber == null || passportNumber.length < 6 && (
                            <InputWarning
                                text='Это обязательное поле' />
                        )
                    }
                </div>
            </div>
            <div className='adminenrollment__wrapper'>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Паспорт выдан</div>
                    <input
                        value={issuedBy == null ? '' : issuedBy}
                        onChange={(e) => setIssuedBy(e.target.value)}
                        className="subsection__input" />
                    {
                        issuedBy == null || issuedBy.length < 6 && (
                            <InputWarning
                                text='Это обязательное поле' />
                        )
                    }
                </div>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Дата выдачи</div>
                    <input
                        value={dateIssuance}
                        type='date'
                        onChange={(e) => setDateIssuence(e.target.value)}
                        className="subsection__input" />
                    {
                        dateIssuance == '' && <InputWarning
                            text='Это обязательное поле' />
                    }
                    {
                        new Date(dateIssuance) > new Date() && <InputWarning
                            text='Слишком большая дата' />
                    }
                    {
                        new Date(dateIssuance) < new Date('1950-01-01') && <InputWarning
                            text='Слишком маленькая дата' />
                    }
                </div>
                <div className='adminenrollment__container'>
                    <div className="subsection__label">Код подразделения</div>
                    <input
                        value={codeSubDepartment == null ? '' : codeSubDepartment}
                        onChange={(e) => setCodeSubDepartment(e.target.value)}
                        className="subsection__input" />
                    {
                        codeSubDepartment == null || codeSubDepartment.length < 2 && (
                            <InputWarning
                                text='Это обязательное поле' />
                        )
                    }
                </div>
            </div>
        </motion.form>
    )
}

export default StudentDocuments