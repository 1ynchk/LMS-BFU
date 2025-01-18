import './admin-static/css/admin-root.css'

import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../../base-components/header';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AdminRoot = () => {

    const role = useSelector(state => state.user.role)
    const navigate = useNavigate()

    useEffect(() => {
       if (role != 'admin') {
            navigate('/')
       } 
    }, [navigate])
    
    return (
        <div className='container'>
            <div className='common__container'>
                <Header />        
            </div>
        </div>
    )
}

export default AdminRoot