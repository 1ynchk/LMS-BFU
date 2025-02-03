import '../../components/Admin/admin-static/css/admin-news.css'

import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import WelcomeSection from "../main-page/welcome-section"
import Subsection from "../Subsections"
import { useEffect } from 'react'

const AdminSection = (props) => {
    const {
        condition_url,
        redirect_url,
        links,
    } = props

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === `/admin/${condition_url}/`) {
            navigate(`/admin/${condition_url}/${redirect_url}/`)
        }
    }, [location])

    return (
        <div className="adminnews-wrapper">
            <WelcomeSection />
            <div className="sections_container">
                <Subsection links={links} />
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ease: 'easeIn', duration: 0.3 }}
                    className='sections_wrapper'>
                    <Outlet />
                </motion.div>
            </div >
        </div >
    )
}


export default AdminSection 