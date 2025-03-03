import { NavLink, useLocation } from 'react-router-dom'
import '../../../admin-static/css/admin-enrollment.css'
import { useEffect, useState } from 'react'

import { CommonInputs } from '../../../../bll/Inputs-bll/common-inputs'
import CommonInfo from './Common-info'
import StudentDocuments from './Student-documents'
import DirectionsInfo from './directions-info'
import Confirmation from './confirmation'
import EnrollmentPopup from './Enrollment-popup'

import {
    UseStudentDocuments,
    UseStudentRussianDocuments,
    UseStudentForeignDocuments
} from '../../../../bll/Inputs-bll/common-inputs'

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
    const [citizenshipType, setCitizenshipType] = useState('russian')

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
        setPassportNumber,

        edNumber,
        setEdNumber,
        edDateIssuance,
        setEdDateIssuance,
        edIssuedBy,
        setEdIssuedBy
    } = UseStudentDocuments()

    const {
        snils,
        setSnils,
        INN,
        setINN
    } = UseStudentRussianDocuments()

    const {
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
    } = UseStudentForeignDocuments()

    // choisen direction 
    const [direction, setDirection] = useState(null)

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault()
            e.returnValue = ""
        };

        window.addEventListener("beforeunload", handleBeforeUnload)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
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
                commonInfo={commonInfo}
                citizenshipType={citizenshipType}
                setCitizenshipType={setCitizenshipType}
                edNumber={edNumber}
                setEdNumber={setEdNumber}
                edDateIssuance={edDateIssuance}
                setEdDateIssuance={setEdDateIssuance}
                edIssuedBy={edIssuedBy}
                setEdIssuedBy={setEdIssuedBy}
                fpNumber={fpNumber}
                setFpNumber={setFpNumber}
                fpDateIssuance={fpDateIssuance}
                setFpDateIssuance={setFpDateIssuance}
                fpExpireDate={fpExpireDate}
                setFpExpireDate={setFpExpireDate}
                fpIssuedBy={fpIssuedBy}
                setFpIssuedBy={setFpIssuedBy}
                mcNumber={mcNumber}
                setMcNumber={setMcNumber}
                mcDateEntry={mcDateEntry}
                setMcDateEntry={setMcDateEntry}
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
                setDocumentsInfo={setDocumentsInfo} />
            break
        case queryParams == 'direction':
            content = <DirectionsInfo
                commonInfo={commonInfo}
                documentsInfo={documentsInfo}
                direction={direction}
                setDirection={setDirection} />
            break
        case queryParams == 'confirm':
            content = <Confirmation
                commonInfo={commonInfo}
                documentsInfo={documentsInfo}
                gender={gender}
                accountPhoto={accountPhoto}
                name={name}
                surname={surname}
                otchestvo={otchestvo}
                number={number}
                email={email}
                password={password}
                datebirth={datebirth}
                citizenship={citizenship}
                issuedBy={issuedBy}
                dateIssuance={dateIssuance}
                codeSubDepartment={codeSubDepartment}
                passportSerial={passportSerial}
                passportNumber={passportNumber}
                edNumber={edNumber}
                edDateIssuance={edDateIssuance}
                edIssuedBy={edIssuedBy}
                snils={snils}
                INN={INN}
                fpNumber={fpNumber}
                fpDateIssance={fpDateIssuance}
                fpExpireDate={fpExpireDate}
                fpIssuedBy={fpIssuedBy}
                mcNumber={mcNumber}
                mcDateEntry={mcDateEntry}
                direction={direction}
                citizenshipType={citizenshipType}
            />
            break
    }

    return (
        <div className="adminenrollment">
            <EnrollmentPopup />
            <div className="subsection__name">Зачисление</div>
            <div className='adminenrollment__stages'>
                <NavLink
                    to='/admin/students/enrollment/'
                    className='adminenrollment__section'>Общая информация</NavLink>
                <NavLink
                    to={commonInfo ? '/admin/students/enrollment/?stage=documents' : null}
                    className='adminenrollment__section'>Документы</NavLink>
                <NavLink
                    to={commonInfo
                        && documentsInfo ? '/admin/students/enrollment/?stage=direction' :
                        `/admin/students/enrollment/${queryParams == null || queryParams == 'null' ? '' : `?stage=${queryParams}`}`}
                    className='adminenrollment__section'>Направление</NavLink>
                <NavLink
                    to={commonInfo && documentsInfo
                        && direction != null ? '/admin/students/enrollment/?stage=confirm' :
                        `/admin/students/enrollment/${queryParams == null || queryParams == 'null' ? '' : `?stage=${queryParams}`}`}
                    className='adminenrollment__section'>Подтверждение</NavLink>
            </div>
            {content}
        </div>
    )
}

export default AdminStudentsEnrollment