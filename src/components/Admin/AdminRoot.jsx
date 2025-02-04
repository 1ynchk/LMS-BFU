import './admin-static/css/admin-root.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from '../../base-components/header';

import AdminMainPage from './admin-components/admin-mainpage/AdminMainPage';

import AdminNewsAll from './admin-components/admin-news/AdminNewsAll';
import AdminNewsAdd from './admin-components/admin-news/AdminNewsAdd';

import AdminSection from '../../base-components/admin/AdminSection';
import AdminStudentsEnrollment from './admin-components/admin-students/Enrollment/AdminStudentsEnrollment';
import { linksAdminStudents, linksAdminNews } from '../../data/AdminSections/subsections';

const AdminRoot = () => {

    const role = useSelector(state => state.user.role)
    const navigate = useNavigate()
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {

        if (role != '') {
            setLoaded(true)
        }

    }, [role])

    useEffect(() => {
        if (isLoaded && role != 'admin') {
            navigate('/')
        }
    }, [isLoaded])

    return (
        <div className='container'>
            <div className='common__container'>
                <Header />
                <Routes>
                    <Route exact path='main-page/' element={<AdminMainPage />} />
                    <Route exact path='news/*' element={<AdminSection
                        condition_url='news'
                        redirect_url='all'
                        links={linksAdminNews} />}>
                        <Route exact path='all/' element={<AdminNewsAll />} />
                        <Route exact path='add/' element={<AdminNewsAdd />} />
                    </Route>
                    <Route exact path='students/*' element={<AdminSection
                        condition_url='students'
                        redirect_url='all'
                        links={linksAdminStudents}
                    />}>
                        <Route exact path='enrollment/' element={<AdminStudentsEnrollment />} />
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default AdminRoot