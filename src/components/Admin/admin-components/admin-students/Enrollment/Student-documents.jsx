
import { useEffect, useState, useRef } from 'react';

import { motion } from 'framer-motion';

import { InputWarning } from '../../../../../base-components/input-warning';
import {
    InputText,
    UnnecessaryInput,
    DateInput
} from '../../../../bll/Inputs-bll/common-inputs';

const StudentDocuments = (props) => {

    const [isPassportSerial, setIsPassportSerial] = useState(true)
    const [isCodeSubDepartment, setIsCodeSubDepartment] = useState(true)
    const [citizenshipType, setCitizenshipType] = useState('russian')
    const serialRef = useRef(null)
    const codeSubDepRef = useRef(null)
    const russianStudentRef = useRef(null)

    const {
        setDocumentsInfo,
        documentsInfo,
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
        snils,
        setSnils,
        INN,
        setINN
    } = props

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    useEffect(() => {
        if (citizenship == null || issuedBy == null || dateIssuance == ''
            || codeSubDepartment == null || passportSerial == null
            || passportNumber == null || citizenship.length < 2
            || passportSerial.length < 2 || passportNumber.length < 6
            || issuedBy.length < 6 || dateIssuance == ''
            || new Date(dateIssuance) > new Date() ||
            new Date(dateIssuance) < new Date('1950-01-01') || codeSubDepartment.length < 2) {
            setDocumentsInfo(false)
        } else {
            setDocumentsInfo(true)
        }
    }, [citizenship, issuedBy,
        dateIssuance, codeSubDepartment,
        passportNumber, passportSerial])

    console.log(citizenshipType)

    return (
        <motion.form
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={(e) => handleSubmit(e)}
            className="studentdocuments">
            <div className='subsections__subtitle'>Паспорт</div>
            <div className='adminenrollment__wrapper'>
                <InputText value={citizenship} setter={setCitizenship} label={'Гражданство'} />
                <UnnecessaryInput
                    value={passportSerial}
                    setter={setPassportSerial}
                    label={'Серия'}
                    _ref={serialRef}
                    isActive={isPassportSerial}
                    setActive={setIsPassportSerial}
                />
                <InputText value={passportNumber} setter={setPassportNumber} label={'Номер'} />
            </div>
            <div className='adminenrollment__wrapper'>
                <InputText value={issuedBy} setter={setIssuedBy} label={'Паспорт выдан'} />
                <DateInput value={dateIssuance} setter={setDateIssuence} label={'Дата выдачи'} />
                <UnnecessaryInput
                    value={codeSubDepartment}
                    setter={setCodeSubDepartment}
                    label={'Код подразделения'}
                    _ref={codeSubDepRef}
                    isActive={isCodeSubDepartment}
                    setActive={setIsCodeSubDepartment}
                />
            </div>
            <div
                ref={russianStudentRef}
                className='subsections__unnecessary_form'>
                <input
                    checked={citizenshipType == 'russian' ? true : false}
                    onChange={() => {
                        if (citizenshipType == 'russian') return
                        else setCitizenshipType('russian')
                    }}
                    name='citizenship_student'
                    className='subsections_unnecessary_form_btn'
                    type='radio' />
                <div className='subsections__subtitle'>Для поступающих из РФ</div>
                <div className='adminenrollment__wrapper'>
                    <InputText
                        value={snils}
                        setter={setSnils}
                        label={'Снилс'}
                        max_length={11} />
                    <InputText
                        value={INN}
                        setter={setINN}
                        label={'ИНН'}
                        max_length={12} />
                </div>
            </div>

            <div className='subsections__unnecessary_form'>
                <input
                    checked={citizenshipType == 'foreign' ? true : false}
                    onChange={() => {
                        if (citizenshipType == 'foreign') return
                        else setCitizenshipType('foreign')
                    }}
                    name='citizenship_student'
                    className='subsections_unnecessary_form_btn'
                    type='radio' />
                <div className='subsections__subtitle'>Для поступающих из РФ</div>
                <div className='adminenrollment__wrapper'>
                    <div className='adminenrollment__container'>
                        <div className="subsection__label">Снилс</div>
                        <input
                            maxLength={11}
                            value={snils == null ? '' : snils}
                            onChange={(e) => setSnils(e.target.value)}
                            className="subsection__input" />
                        {
                            snils == null || snils.length < 11 && (
                                <InputWarning
                                    text='Это обязательное поле' />
                            )
                        }
                    </div>
                    <div className='adminenrollment__container'>
                        <div className="subsection__label">ИНН</div>
                        <input
                            maxLength={12}
                            value={INN == null ? '' : INN}
                            onChange={(e) => setINN(e.target.value)}
                            className="subsection__input" />
                        {
                            INN == null || INN.length < 12 && (
                                <InputWarning
                                    text='Это обязательное поле' />
                            )
                        }
                    </div>
                </div>
            </div>

            <div className='adminnewsadd__btn_container'>
                <button
                    disabled={!documentsInfo}
                    className='subsection__btn'
                    type='submit'>
                    {!documentsInfo ? 'Не все поля заполнены' : 'Продолжить'}
                </button>
            </div>
        </motion.form>
    )
}

export default StudentDocuments