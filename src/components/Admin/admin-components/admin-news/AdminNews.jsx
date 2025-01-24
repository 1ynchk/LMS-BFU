import '../../admin-static/css/admin-news.css'

import { Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom'

import WelcomeSection from "../../../../base-components/main-page/welcome-section"
import Subsection from "../../../../base-components/Subsections"
import { useEffect } from 'react'

const AdminNews = () => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/admin/news/') {
            navigate('/admin/news/all/')
        }
    }, [location])
    
    return (
        <div className="adminnews-wrapper">
            <WelcomeSection /> 
            <div className="sections_container">
                <Subsection />
                <div className='sections_wrapper'>
                    <Outlet /> 
                </div>
            </div>
        </div>
    )
}


export default AdminNews