
import { useEffect, useState, useRef } from 'react';

import { motion } from 'framer-motion';

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
        fpNumber, setFpNumber, fpDateIssuance,
        setFpDateIssuance, fpExpireDate, setFpExpireDate,
        fpIssuedBy, setFpIssuedBy, mcNumber,
        setMcNumber, mcDateEntry, setMcDateEntry,
        setDocumentsInfo, documentsInfo,
        citizenship, setCitizenship, issuedBy,
        setIssuedBy, dateIssuance,
        setDateIssuence, codeSubDepartment, setCodeSubDepartment,
        passportSerial, setPassportSerial, passportNumber,
        setPassportNumber, snils, setSnils,
        INN, setINN, edNumber, setEdNumber, edDateIssuance,
        setEdDateIssuance, edIssuedBy, setEdIssuedBy
    } = props

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    useEffect(() => {
        if (citizenship == null || issuedBy == null || dateIssuance == '' || edIssuedBy == null 
            || codeSubDepartment == null || passportSerial == null 
            || passportNumber == null || citizenship == '' || edNumber == null
            || passportSerial == '' || passportNumber == '' || edNumber == ''
            || edIssuedBy == '' || dateIssuance == '' || edDateIssuance == ''
            || new Date(dateIssuance) > new Date() || new Date(edDateIssuance) > new Date() ||
            new Date(dateIssuance) < new Date('1950-01-01')
            || new Date(edDateIssuance) < new Date('1950-01-01') || codeSubDepartment == '') {
            setDocumentsInfo(false)
        } else {
            if (citizenshipType == 'russian') {
                if (snils == null || INN == null || snils == '' || INN == '') {
                    setDocumentsInfo(false)
                } else {
                    setDocumentsInfo(true)
                }
            } else {
                console.log('hello')
                if (fpNumber == null || fpNumber == '' || new Date(fpDateIssuance) > new Date()
                    || new Date(dateIssuance) < new Date('1950-01-01') || fpDateIssuance == ''
                    || new Date(fpExpireDate) > new Date() || new Date(fpExpireDate) < new Date('1950-01-01') 
                    || fpExpireDate == '' || fpIssuedBy == null || fpIssuedBy == '' || mcNumber == null 
                    || mcNumber == '' || new Date(mcDateEntry) > new Date()
                    || new Date(mcDateEntry) < new Date('1950-01-01') || mcDateEntry == ''
                ) {
                    setDocumentsInfo(false)
                } else {
                    setDocumentsInfo(true)
                }
            }
        }
    }, [citizenshipType, citizenship, issuedBy, dateIssuance, codeSubDepartment, edNumber, 
        passportNumber, passportSerial, snils, INN, edDateIssuance, edIssuedBy, fpNumber,
        fpDateIssuance, fpExpireDate, fpIssuedBy, mcNumber, mcDateEntry
    ])

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
            <div className='subsections__subtitle'>Документ об образовании</div>
            <div className='adminenrollment__wrapper'>
                <InputText value={edNumber} setter={setEdNumber} label={'Номер'} />
                <DateInput value={edDateIssuance} setter={setEdDateIssuance} label={'Дата выдачи'} />
                <InputText value={edIssuedBy} setter={setEdIssuedBy} label={'Выдан'} />
            </div>
            <motion.div
                animate={{ backgroundColor: citizenshipType == 'russian' ? '#fffaf0' : '#8080804c' }}
                transition={{ duration: 0.5 }}
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
                        isDisabled={citizenshipType == 'russian' ? true : false}
                        value={snils}
                        setter={setSnils}
                        label={'Снилс'}
                        max_length={11} />
                    <InputText
                        isDisabled={citizenshipType == 'russian' ? true : false}
                        value={INN}
                        setter={setINN}
                        label={'ИНН'}
                        max_length={12} />
                </div>
            </motion.div>

            <motion.div
                animate={{ backgroundColor: citizenshipType == 'foreign' ? '#fffaf0' : '#8080804c' }}
                transition={{ duration: 0.5 }}
                className='subsections__unnecessary_form'>
                <input
                    checked={citizenshipType == 'foreign' ? true : false}
                    onChange={() => {
                        if (citizenshipType == 'foreign') return
                        else setCitizenshipType('foreign')
                    }}
                    name='citizenship_student'
                    className='subsections_unnecessary_form_btn'
                    type='radio' />
                <div className='subsections__subtitle'>Для иностранных граждан</div>
                <div className='subsections__subtitle'>Загран паспорт</div>
                <div className='adminenrollment__wrapper'>
                    <InputText
                        isDisabled={citizenshipType == 'foreign' ? true : false}
                        value={fpNumber}
                        setter={setFpNumber}
                        label={'Номер'} />
                    <DateInput
                        isDisabled={citizenshipType == 'foreign' ? true : false}
                        value={fpDateIssuance}
                        setter={setFpDateIssuance}
                        label={'Дата выдачи'} />
                    <DateInput
                        isDisabled={citizenshipType == 'foreign' ? true : false}
                        value={fpExpireDate}
                        setter={setFpExpireDate}
                        label={'Срок действия'} />
                    <InputText
                        isDisabled={citizenshipType == 'foreign' ? true : false}
                        value={fpIssuedBy}
                        setter={setFpIssuedBy}
                        label={'Выдан'} />
                </div>
                <div className='subsections__subtitle'>Миграционная карта</div>
                <div className='adminenrollment__wrapper'>
                    <InputText
                        isDisabled={citizenshipType == 'foreign' ? true : false}
                        value={mcNumber}
                        setter={setMcNumber}
                        label={'Номер'} />
                    <DateInput
                        isDisabled={citizenshipType == 'foreign' ? true : false}
                        value={mcDateEntry}
                        setter={setMcDateEntry}
                        label={'Дата въезда'} />
                </div>
            </motion.div>

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