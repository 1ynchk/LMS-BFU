import { NavLink, useLocation } from 'react-router-dom'
import '../../../admin-static/css/admin-enrollment.css'
import { useEffect, useState } from 'react'

import { CommonInputs } from '../../../../bll/Inputs-bll/common-inputs'
import CommonInfo from './Common-info'
import StudentDocuments from './Student-documents'
import { UseStudentDocuments, UseStudentRussianDocuments } from '../../../../bll/Inputs-bll/common-inputs'
import { PhotoBLL } from '../../../../bll/Common-bll/Photo'

import { FaLongArrowAltRight } from "react-icons/fa";

const AdminStudentsEnrollment = () => {

    const location = useLocation()
    const [queryParams, setQueryParams] = useState(new URLSearchParams(location.search).get('stage'))
    let content = null

    // common info
    const [commonInfo, setCommonInfo] = useState(false)

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
        datebirth,
        setDatebirth,
    } = CommonInputs()

    // documents
    const [documentsInfo, setDocumentsInfo] = useState(false)
    
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
    } = UseStudentDocuments()

    const {
        snils, 
        setSnils, 
        INN, 
        setINN
    } = UseStudentRussianDocuments()

    const {
        handleDragLeave,
        handleDragOver,
        handleDrop } = PhotoBLL()

    useEffect(() => {

        const handleBeforeUnload = (e) => {
            e.preventDefault()
            e.returnValue = ""
        };

        window.addEventListener("beforeunload", handleBeforeUnload)

        return () => {
            window.addEventListener("beforeunload", handleBeforeUnload)
        }
    }, [])

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
            case queryParams == 'direction':
                set[0].classList.add('choisen')
                set[1].classList.add('choisen')
                set[2].classList.add('choisen')
                break
            case queryParams == 'confirm':
                set[0].classList.add('choisen')
                set[1].classList.add('choisen')
                set[2].classList.add('choisen')
                set[3].classList.add('choisen')
                break
        }
    }, [queryParams])

    switch (true) {
        case queryParams == null:
            content = <CommonInfo
                gender={gender}
                setGender={setGender}
                accountPhoto={accountPhoto}
                setAccountPhoto={setAccountPhoto}
                datebirth={datebirth}
                setDatebirth={setDatebirth}
                name={name}
                setName={setName}
                surname={surname}
                setSurname={setSurname}
                otchestvo={otchestvo}
                setOtchesctvo={setOtchesctvo}
                number={number}
                setNumber={setNumber}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                commonInfo={commonInfo}
                setCommonInfo={setCommonInfo} />
            break
        case queryParams == 'documents':
            content = <StudentDocuments
                snils={snils}
                setSnils={setSnils}
                INN={INN}
                setINN={setINN}
                citizenship={citizenship}
                setCitizenship={setCitizenship}
                issuedBy={issuedBy}
                setIssuedBy={setIssuedBy}
                dateIssuance={dateIssuance}
                setDateIssuence={setDateIssuence}
                codeSubDepartment={codeSubDepartment}
                setCodeSubDepartment={setCodeSubDepartment}
                passportSerial={passportSerial}
                setPassportSerial={setPassportSerial}
                passportNumber={passportNumber}
                setPassportNumber={setPassportNumber}
                documentsInfo={documentsInfo}
                setDocumentsInfo={setDocumentsInfo}/>
            break
        case queryParams == 'confirm':
            content = null
            break
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="adminenrollment">

            <div className="subsection__name">Зачисление</div>
            <div className='adminenrollment__stages'>
                <NavLink
                    to='/admin/students/enrollment/'
                    className='adminenrollment__section'>Общая информация</NavLink>
                <FaLongArrowAltRight />
                <NavLink
                    // to={commonInfo ? '/admin/students/enrollment/?stage=documents' : undefined}
                    to='/admin/students/enrollment/?stage=documents'
                    className='adminenrollment__section'>Документы</NavLink>
                <FaLongArrowAltRight />
                <NavLink
                    to='/admin/students/enrollment/?stage=direction'
                    className='adminenrollment__section'>Направление</NavLink>
                <FaLongArrowAltRight />
                <NavLink
                    to='/admin/students/enrollment/?stage=confirm'
                    className='adminenrollment__section'>Подтверждение</NavLink>
            </div>
            {content}
        </div>
    )
}

export default AdminStudentsEnrollment