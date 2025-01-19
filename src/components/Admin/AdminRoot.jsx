import './admin-static/css/admin-root.css'

import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../../base-components/header';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
            </div>
        </div>
    )
}

export default AdminRoot