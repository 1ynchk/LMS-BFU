import { NavLink, useLocation } from 'react-router-dom'
import '../../../admin-static/css/admin-enrollment.css'
import { useEffect, useState } from 'react'

import CommonInputs from '../../../../bll/Inputs-bll/common-inputs'
import CommonInfo from './Common-info'
import { PhotoBLL } from '../../../../bll/Common-bll/Photo'

const AdminStudentsEnrollment = () => {

    const location = useLocation()
    const [queryParams, setQueryParams] = useState(new URLSearchParams(location.search).get('stage'))
    let content = null

    // common info
    const [commonInfo, setCommonInfo] = useState(false)

    const {
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

    const {
        filePicker,
        dropZone,
        isUpload,
        setUpload,
        selectedFile,
        setSelectedFile,
        handleDragLeave,
        handleDragOver,
        handleDrop } = PhotoBLL()

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
                datebirth={datebirth}
                setDatebirth={setDatebirth}
                filePicker={filePicker}
                dropZone={dropZone}
                isUpload={isUpload}
                setUpload={setUpload}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
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
            content = null
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

export default AdminStudentsEnrollment